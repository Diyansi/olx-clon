import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';  // Only keep this line
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';  // Use import instead of require
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();  // This is the correct way in ES modules

// Controllers
import * as productController from './controllers/productController.js';
import * as userController from './controllers/userController.js';

cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  pi_keya: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'olx_uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });
const app = express();
const port = 4000;

// Static folder for uploads
app.use('/uploads', express.static(path.resolve('uploads')));

// Middleware
app.use(cors());
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

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
