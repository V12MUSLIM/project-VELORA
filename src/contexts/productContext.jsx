import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
// ...existing code...

const [products, setProducts] = useState([
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    category: "Audio",
    rating: 4.8,
    reviews: 1205,
    description: "Premium wireless headphones with industry-leading noise cancellation and Hi-Res Audio",
    inStock: true,
    badge: "Premium"
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch M2 Max",
    price: 2499.99,
    originalPrice: 2699.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Computers",
    rating: 4.9,
    reviews: 856,
    description: "Apple's most powerful laptop with M2 Max chip, 32GB RAM, 1TB SSD",
    inStock: true,
    badge: "Pro"
  },
  {
    id: 3,
    name: "Canon EOS R5",
    price: 3899.99,
    originalPrice: 4199.99,
    image: "https://www.tipa.com/wp-content/uploads/2022/05/2022-08.jpg",
    category: "Cameras",
    rating: 4.7,
    reviews: 645,
    description: "45MP full-frame mirrorless camera with 8K video recording",
    inStock: true,
    badge: "Professional"
  },
  {
    id: 4,
    name: "Samsung Neo QLED 8K TV",
    price: 4999.99,
    originalPrice: 5499.99,
    image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=400&h=400&fit=crop",
    category: "TVs",
    rating: 4.8,
    reviews: 423,
    description: "75-inch 8K Smart TV with Quantum Matrix Technology",
    inStock: true,
    badge: "Premium"
  },
  {
    id: 5,
    name: "ASUS ROG Strix Gaming PC",
    price: 3299.99,
    originalPrice: 3599.99,
    image: "https://www.asus.com/media/Odin/Websites/global/Series/52.png",
    category: "Gaming",
    rating: 4.9,
    reviews: 789,
    description: "RTX 4090, Intel i9-13900K, 64GB RAM, 2TB NVMe SSD",
    inStock: true,
    badge: "Ultimate"
  },
  {
    id: 6,
    name: "iPad Pro 12.9-inch M2",
    price: 1299.99,
    originalPrice: 1399.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "Tablets",
    rating: 4.8,
    reviews: 934,
    description: "Latest iPad Pro with M2 chip, 256GB, Wi-Fi + 5G",
    inStock: true,
    badge: "Pro"
  },
  {
    id: 7,
    name: "DJI Mavic 3 Pro",
    price: 2199.99,
    originalPrice: 2499.99,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop",
    category: "Drones",
    rating: 4.7,
    reviews: 512,
    description: "Professional drone with Hasselblad camera and 5.1K video",
    inStock: true,
    badge: "Pro"
  },
  {
    id: 8,
    name: "Sony A95K QD-OLED",
    price: 2999.99,
    originalPrice: 3299.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "TVs",
    rating: 4.9,
    reviews: 378,
    description: "65-inch 4K QD-OLED TV with cognitive processor XR",
    inStock: true,
    badge: "Premium"
  },
  {
    id: 9,
    name: "NVIDIA RTX 4090 Ti",
    price: 1999.99,
    originalPrice: 2199.99,
    image: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=400&h=400&fit=crop",
    category: "Components",
    rating: 4.8,
    reviews: 645,
    description: "Ultimate graphics card with 24GB GDDR6X memory",
    inStock: false,
    badge: "Limited"
  },
  {
    id: 10,
    name: "Apple Vision Pro",
    price: 3499.99,
    originalPrice: null,
    image: "https://ennap.com/cdn/shop/files/Apple-WWCD23-Vision-Pro-glass-230605_big.jpg.large.jpg?v=1708194696",
    category: "VR/AR",
    rating: 4.9,
    reviews: 245,
    description: "Revolutionary spatial computing device with M2 and R1 chips",
    inStock: false,
    badge: "New"
  }
]);

// ...existing code...

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
