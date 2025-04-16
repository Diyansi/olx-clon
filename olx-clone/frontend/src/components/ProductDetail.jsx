import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import "./Header.css";

// ✅ Default Products List
const defaultProducts = [
  {
    _id: "bike",
    pname: "Royal Enfield",
    category: "Bikes",
    price: " ₹1,73,000 ",
    pdesc: "Royal Enfield is a popular Indian motorcycle brand known for its iconic bikes like Bullet and Classic. These bikes are famous for their classic design and heavy-duty performance, making them ideal for long-distance touring. Royal Enfield motorcycles are recognized for their vintage look and solid build quality.",
    pimage: "/logo/b.jpeg",
    pimage2: "/logo/b1.jpeg",
    addedBy: "default",
  },
  {
    _id: "default-2",
    pname: "Iphone 12",
    category: "Mobiles",
    price: "₹1,299",
    pdesc: "The iPhone 12 is an Apple smartphone released in 2020. It features a 6.1-inch Super Retina XDR display, A14 Bionic chip, and a 12MP dual-camera system. It supports 5G connectivity and has a Ceramic Shield front cover, making it more durable. The phone runs the latest version of iOS and has a sleek design with flat edges.",
    pimage: "/logo/m.jpg",
    pimage2: "/logo/m1.jpeg",
    addedBy: "default",
  },
  {
    _id: "default-3",
    pname: "Man's cloth",
    category: "Cloth",
    price: "₹499",
    pdesc: "Men's professional clothing includes formal outfits such as suits, blazers, dress shirts, ties, and trousers, ideal for office wear or business meetings. Suits, especially tailored ones, provide a classic look, while dress shirts and trousers are versatile and can be mixed and matched. High-quality fabrics like wool and cotton are used for comfort and style, and properly fitting clothes, polished shoes, and minimal accessories enhance professionalism.",
    pimage: "/logo/cm1.jpeg",
    pimage2: "/logo/cm11.jpeg",
    addedBy: "default",
  },
  {
    _id: "default-4",
    pname: "2 BHK plot",
    category: "Plots",
    price: "₹60Lakh",
    pdesc: "A 2 BHK plot refers to a property where you can build a house with 2 bedrooms, a hall, and a kitchen. This is a residential plot where you can design and construct your 2 BHK house. The size of the plot varies depending on the location and specifications by the developer. Typically, a 2 BHK plot provides enough space to create a comfortable living area for your family.",
    pimage: "/logo/p.jpeg",
    pimage2: "/logo/p1.jpeg",
    addedBy: "default",
  },
  {
    _id: "default-5",
    pname: "Grocery",
    category: "Sale",
    price: "50% OFF",
    pdesc: "Grocery refers to the daily-use items we consume for food and household needs. It includes vegetables, fruits, pulses, rice, flour, dairy products (milk, butter, cheese), cooking oil, spices, snacks, and packaged items like biscuits, noodles, and ready-to-eat food. Grocery shopping is usually done weekly or based on need.",
    pimage: "/logo/s.jpeg",
    pimage2: "/logo/s1.jpg",
    addedBy: "default",
  },
  {
    _id: "default-6",
    pname: "2 BHK flat",
    category: "Rent",
    price: "₹17000/M",
    pdesc: "A 2 BHK rent flat is a property with 2 bedrooms, a hall, and a kitchen available for rent. These flats are commonly found in urban areas where people look for comfortable living spaces. The rent of such flats varies based on location, amenities, and the condition of the building. You’ll need to consider monthly rent, security deposit, and maintenance charges when renting a 2 BHK flat.",
    pimage: "/logo/r.jpeg",
    pimage2: "/logo/r1.jpg",
    addedBy: "default",
  },
  {
    _id: "default-7",
    pname: "Boat Headphone",
    category: "Headphone",
    price: "₹3,999",
    pdesc: "Boat headphones are a popular brand known for offering stylish and affordable audio products. These headphones are known for high-quality sound, comfortable fit, and durable build. Boat headphones come in both wireless and wired options, featuring noise cancellation, sweatproof design (for sports use), and long battery life. The sound quality is bass-heavy, making them appealing to music lovers.",
    pimage: "/logo/h.jpg",
    pimage2: "/logo/h1.jpg",
    addedBy: "default",
  },
  {
    _id: "default-8",
    pname: "Asus Vivobook",
    category: "Laptops",
    price: "₹1Lakh",
    pdesc: "Asus VivoBook is a series of laptops by Asus, known for offering a combination of performance, style, and affordability. These laptops are designed for everyday use and come with various specifications, including Intel or AMD processors, Full HD displays, and solid build quality. VivoBooks are available in different models, catering to students, professionals, and casual users. They often feature a slim design, good battery life, and are equipped with essential ports and connectivity options, making them a popular choice for those looking for a budget-friendly yet reliable laptop.",
    pimage: "/logo/lap.jpeg",
    pimage2: "/logo/lap1.jpeg",
    addedBy: "default",
  },
  {
    _id: "default-9",
    pname: "Cemera",
    category: "Electronics",
    price: "₹8,500",
    pdesc: "A camera is a device used to capture photos or videos. It works by recording light on a sensor (in digital cameras) or film (in traditional cameras). Cameras come in various types, such as DSLR, mirrorless, point-and-shoot, and smartphone cameras. DSLR and mirrorless cameras offer high-quality images and are often used by professionals, while point-and-shoot and smartphone cameras are more compact and convenient for everyday use. Modern cameras come with features like autofocus, image stabilization, and the ability to shoot in various lighting conditions.",
    pimage: "/logo/e.jpeg",
    pimage2: "/logo/e1.jpeg",
    addedBy: "default",
  },
  {
    _id: "default-10",
    pname: "Vikrant",
    category: "Bikes",
    price: "₹66,448",
    pdesc: "Vikrant is an Indian motorcycle brand known for producing affordable and reliable bikes, catering to the budget-conscious segment of the market. The bikes are designed for daily commuting, with a focus on fuel efficiency, durability, and performance. While not as internationally recognized as some other motorcycle brands, Vikrant bikes have gained popularity in certain regions due to their value for money and practicality. They are often chosen by those looking for a basic, no-frills bike for regular use.",
    pimage: "/logo/bb.jpeg",
    pimage2: "/logo/bb1.jpeg",
    addedBy: "default",
  },
];

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    const url = API_URL + "/get-product/" + productId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
        } else {
          const defaultProduct = defaultProducts.find((p) => p._id === productId);
          if (defaultProduct) {
            setProduct(defaultProduct);
          } else {
            alert("Product Not Found");
          }
        }
      })
      .catch(() => {
        alert("Server Error");
      });
  }, [productId]);

  const handleContact = (addedBy) => {
    setShowContact(true);

    if (addedBy === "default") {
      setUser({
        username: "dIYU",
        mobile: "9428000000",
        email: "admin@diyumart.com",
      });
      return;
    }

    const url = API_URL + "/get-user/" + addedBy;
    axios
      .get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        alert("Server Error");
      });
  };

  return (
    <>
      <Header />
      <div className="product-container">
        <h2>PRODUCT DETAILS :</h2>
        {product && (
          <div className="product-details">
            <div className="product-images">
              {/* ✅ Image Handling for Default and Non-Default Products */}
              <img
                src={
                  product.addedBy === "default"
                    ? process.env.PUBLIC_URL + product.pimage
                    : product.pimage.startsWith("http")
                    ? product.pimage
                    : API_URL + "/" + product.pimage
                }
                alt={product.pname}
              />
              {product.pimage2 && (
                <img
                  src={
                    product.addedBy === "default"
                      ? process.env.PUBLIC_URL + product.pimage2
                      : product.pimage2.startsWith("http")
                      ? product.pimage2
                      : API_URL + "/" + product.pimage2
                  }
                  alt={product.pname}
                />
              )}
            </div>
            <div className="product-info">
              <h3 className="price-text">Rs. {product.price} /-</h3>
              <p>
                {product.pname} | {product.category}
              </p>
              <p className="text-success">{product.pdesc}</p>

              {!showContact && (
                <button className="contact-button" onClick={() => handleContact(product.addedBy)}>
                  SHOW CONTACT DETAILS
                </button>
              )}

              {showContact && user && (
                <div className="contact-details">
                  <h4>{user.username}</h4>
                  <h3>{user.mobile}</h3>
                  <h6>{user.email}</h6>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
