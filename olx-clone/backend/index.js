import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

// Controllers
import * as productController from './controllers/productController.js';
import * as userController from './controllers/userController.js';

// Cloudinary config (direct keys, NOT recommended for production)
cloudinary.config({
  cloud_name: 'dfgwno6c0',
  api_key: '986545147367419',
  api_secret: 'ZGdSAdhG4IdPwniYNS6OUqyn5is'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'olx_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });
const app = express();

// Static folder for uploads (Vercel pe kaam nahi karega, optional)
app.use('/uploads', express.static(path.resolve('uploads')));

// --- FINAL CORS CONFIG ---
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000'
    ];
    // This regex matches both production and all preview URLs
    const vercelRegex = /^https:\/\/olx-clon-lspx(\-[a-z0-9\-]+)?\.vercel\.app$/;

    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      vercelRegex.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('hello...'));

app.get('/search', productController.search);
app.post('/like-product', userController.likeProducts);
app.post('/add-product', upload.fields([{ name: 'pimage' }, { name: 'pimage2' }]), productController.addProduct);
app.get('/get-products', productController.getProducts);
app.get('/get-product/:pId', productController.getProductsById);
app.post('/liked-products', userController.likedProducts);
app.post('/my-products', productController.myProducts);
app.post('/signup', userController.signup);
app.get('/my-profile/:userId', userController.myProfileById);
app.get('/get-user/:uId', userController.getUserById);
app.post('/login', userController.login);

// --- Vercel ke liye export default app ---
export default app;
