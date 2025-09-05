import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {


const [products, setProducts] = useState([
  // --- Existing Products ---
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://www.powerhouse.je/images/products/1728466641-19729000.jpg",
    category: "Audio",
    rating: 4.8,
    description: "Premium wireless headphones with industry-leading noise cancellation and Hi-Res Audio.",
    inStock: true,
    badge: "Premium",
    gallery: [
      "https://www.powerhouse.je/images/products/1728466641-19729000.jpg",
      "https://valueelectronics.com/wp-content/uploads/2022/05/WH-1000XM5_keyvisual_silver-Large-scaled.jpg",
      "https://m.media-amazon.com/images/I/51aXvjzcukL.jpg",
      "https://down-my.img.susercontent.com/file/my-11134207-7rasb-mczta1crull1a2"
    ],
    specs: [
      { label: "Weight", value: "250g" },
      { label: "Battery Life", value: "30 hours" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Driver Size", value: "40mm" }
    ],
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch M2 Max",
    price: 2499.99,
    originalPrice: 2699.99,
    image: "https://m.media-amazon.com/images/I/61s6UawAo5L.jpg",
    category: "Computers",
    rating: 4.9,
    description: "Apple's most powerful laptop with M2 Max chip, 32GB RAM, 1TB SSD.",
    inStock: true,
    badge: "Pro",
    gallery: [
      "https://m.media-amazon.com/images/I/61s6UawAo5L.jpg",
      "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111932_sp809-mbp16touch-silver-2019.jpeg",
      "https://powermaccenter.com/cdn/shop/files/MacBook_Pro_16_in_M3_Pro_Max_Silver_PDP_Image_Position_9__en-US_ccf12470-f3eb-4dcb-b479-9ed09409d1d1.jpg?v=1699060994&width=823",
      "https://atlas-content-cdn.pixelsquid.com/assets_v2/334/3346292713464010351/jpeg-600/G03.jpg?modifiedAt=1"
    ],
    specs: [
      { label: "CPU", value: "Apple M2 Max" },
      { label: "RAM", value: "32GB" },
      { label: "Storage", value: "1TB SSD" },
      { label: "Screen", value: "16-inch Retina Display" }
    ],
  },
  {
    id: 3,
    name: "Canon EOS R5",
    price: 3899.99,
    originalPrice: 4199.99,
    image: "https://cdn.media.amplience.net/i/canon/eos-r5_front_rf24-105mmf4lisusm_square_32c26ad194234d42b3cd9e582a21c99b",
    category: "Cameras",
    rating: 4.7,
    description: "45MP full-frame mirrorless camera with 8K video recording.",
    inStock: true,
    badge: "Professional",
    gallery: [
      "https://cdn.media.amplience.net/i/canon/eos-r5_front_rf24-105mmf4lisusm_square_32c26ad194234d42b3cd9e582a21c99b",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Resolution", value: "45MP" },
      { label: "Video", value: "8K RAW" },
      { label: "Sensor", value: "Full Frame CMOS" },
      { label: "Stabilization", value: "In-body 5-axis" }
    ],
  },
  {
    id: 4,
    name: "Samsung Neo QLED 8K TV",
    price: 4999.99,
    originalPrice: 5499.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-546784817?$Q90_684_547_JPG$",
    category: "TVs",
    rating: 4.8,
    description: "75-inch 8K Smart TV with Quantum Matrix Technology.",
    inStock: true,
    badge: "Premium",
    gallery: [
      "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-546784817?$Q90_684_547_JPG$",
      "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-548130719?$Q90_684_547_JPG$",
      "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-548130761?$Q90_684_547_JPG$",
      "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-548130761?$Q90_684_547_JPG$"
    ],
    specs: [
      { label: "Screen Size", value: "75-inch" },
      { label: "Resolution", value: "8K" },
      { label: "HDR", value: "HDR10+" },
      { label: "Smart TV", value: "Yes" }
    ],
  },
  {
    id: 5,
    name: "ASUS ROG Strix Gaming PC",
    price: 3299.99,
    originalPrice: 3599.99,
    image: "https://m.media-amazon.com/images/I/611-2oHPNkL.jpg",
    category: "Gaming",
    rating: 4.9,
    description: "RTX 4090, Intel i9-13900K, 64GB RAM, 2TB NVMe SSD.",
    inStock: true,
    badge: "Ultimate",
    gallery: [
      "https://m.media-amazon.com/images/I/611-2oHPNkL.jpg",
      "https://m.media-amazon.com/images/I/51SSjR65kEL._AC_SY450_.jpg",
      "https://m.media-amazon.com/images/I/51uUODFdhJL._AC_SY450_.jpg",
      "https://m.media-amazon.com/images/I/71xgVVsyfoL._AC_SY450_.jpg"
    ],
    specs: [
      { label: "GPU", value: "NVIDIA RTX 4090" },
      { label: "CPU", value: "Intel i9-13900K" },
      { label: "RAM", value: "64GB DDR5" },
      { label: "Storage", value: "2TB NVMe SSD" }
    ],
  },
  {
    id: 6,
    name: "iPad Pro 12.9-inch M2",
    price: 1299.99,
    originalPrice: 1399.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "Tablets",
    rating: 4.8,
    description: "Latest iPad Pro with M2 chip, 256GB, Wi-Fi + 5G.",
    inStock: true,
    badge: "Pro",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1603899124588-0b9b9add4ef7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587427998493-e3492a593366?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Chip", value: "Apple M2" },
      { label: "Storage", value: "256GB" },
      { label: "Display", value: "12.9-inch Liquid Retina" },
      { label: "Connectivity", value: "Wi-Fi + 5G" }
    ],
  },
  {
    id: 7,
    name: "DJI Mavic 3 Pro",
    price: 2199.99,
    originalPrice: 2499.99,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop",
    category: "Drones",
    rating: 4.7,
    description: "Professional drone with Hasselblad camera and 5.1K video.",
    inStock: true,
    badge: "Pro",
    gallery: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594151261510-0bdb00dbe5f0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1527153935397-5a1a69d71a14?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1557015522-850a1cbc7f14?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Camera", value: "Hasselblad 20MP" },
      { label: "Video", value: "5.1K" },
      { label: "Flight Time", value: "46 minutes" },
      { label: "Range", value: "15 km" }
    ],
  },
  {
    id: 8,
    name: "Sony A95K QD-OLED",
    price: 2999.99,
    originalPrice: 3299.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "TVs",
    rating: 4.9,
    description: "65-inch 4K QD-OLED TV with cognitive processor XR.",
    inStock: true,
    badge: "Premium",
    gallery: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516714435131-44d6a96e7e85?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1629131723466-b6b6a33b9347?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1626294281315-9f550953a7b7?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Screen Size", value: "65-inch" },
      { label: "Resolution", value: "4K" },
      { label: "Panel", value: "QD-OLED" },
      { label: "Processor", value: "Cognitive XR" }
    ],
  },
  {
    id: 9,
    name: "NVIDIA RTX 4090",
    price: 1999.99,
    originalPrice: 2199.99,
    image: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=400&h=400&fit=crop",
    category: "Components",
    rating: 4.8,
    description: "Ultimate graphics card with 24GB GDDR6X memory.",
    inStock: false,
    badge: "Limited",
    gallery: [
      "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1635323273197-d6468d8bcee2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1664379736173-1959778265a7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "CUDA Cores", value: "16384" },
      { label: "Memory", value: "24GB GDDR6X" },
      { label: "Boost Clock", value: "2.5GHz" },
      { label: "Power", value: "450W" }
    ],
  },
  {
    id: 10,
    name: "Apple Vision Pro",
    price: 3499.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1695328224345-d6c56a5c68b7?w=400&h=400&fit=crop",
    category: "VR/AR",
    rating: 4.9,
    description: "Revolutionary spatial computing device with M2 and R1 chips.",
    inStock: false,
    badge: "New",
    gallery: [
      "https://images.unsplash.com/photo-1695328224345-d6c56a5c68b7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1695328224522-813c983416b6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1707157299096-03615e449942?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1675786733281-22e43f5505e6?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Chipset", value: "Apple M2 + R1" },
      { label: "Display", value: "Micro-OLED" },
      { label: "Storage", value: "256GB / 512GB / 1TB" },
      { label: "Connectivity", value: "Wi-Fi 6E" }
    ],
  },

  // --- New Products ---
  {
    id: 11,
    name: "Apple Watch Ultra 2",
    price: 799.00,
    originalPrice: 849.00,
    image: "https://images.unsplash.com/photo-1695026402518-a6d130b0579e?w=400&h=400&fit=crop",
    category: "Wearables",
    rating: 4.9,
    description: "The most rugged and capable Apple Watch ever. Designed for endurance, exploration, and adventure.",
    inStock: true,
    badge: "Rugged",
    gallery: [
      "https://images.unsplash.com/photo-1695026402518-a6d130b0579e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1694931969239-3220f18c650e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1678830491762-3c13254585c4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1664403300329-079d39125679?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Case Size", value: "49mm" },
      { label: "Material", value: "Titanium" },
      { label: "Water Resistance", value: "100m" },
      { label: "Battery", value: "Up to 36 hours" }
    ],
  },
  {
    id: 12,
    name: "PlayStation 5 Console",
    price: 499.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    category: "Gaming",
    rating: 4.8,
    description: "Experience lightning-fast loading with an ultra-high-speed SSD and deeper immersion with haptic feedback.",
    inStock: false,
    badge: "Best Seller",
    gallery: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1620392124302-9a3802796444?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611916656173-875e4277bea6?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Storage", value: "825GB SSD" },
      { label: "CPU", value: "AMD Zen 2" },
      { label: "GPU", value: "AMD RDNA 2" },
      { label: "Resolution", value: "Up to 8K" }
    ],
  },
  {
    id: 13,
    name: "Samsung Galaxy S25 Ultra",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "Smartphones",
    rating: 4.9,
    description: "The ultimate smartphone with a pro-grade camera, intelligent battery, and a stunning Dynamic AMOLED 2X display.",
    inStock: true,
    badge: "New",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5a1b3b4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1611403554313-2272a445d212?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Screen", value: "6.8-inch Dynamic AMOLED" },
      { label: "Camera", value: "200MP Wide" },
      { label: "Processor", value: "Snapdragon 8 Gen 3" },
      { label: "Battery", value: "5000mAh" }
    ],
  },
  {
    id: 14,
    name: "Logitech MX Keys S",
    price: 109.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1601619623637-9571f33f11d3?w=400&h=400&fit=crop",
    category: "Peripherals",
    rating: 4.8,
    description: "Advanced wireless illuminated keyboard with smart keys for a fluid typing experience.",
    inStock: true,
    badge: "Popular",
    gallery: [
      "https://images.unsplash.com/photo-1601619623637-9571f33f11d3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595044845814-1f5445218206?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618384887924-3c5b3d2eda05?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth, USB-C" },
      { label: "Backlighting", value: "Smart Illumination" },
      { label: "Battery", value: "Up to 10 days" },
      { label: "Compatibility", value: "macOS, Windows, Linux" }
    ],
  },
  {
    id: 15,
    name: "Dell UltraSharp 4K Monitor",
    price: 759.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1527814223028-79532959582d?w=400&h=400&fit=crop",
    category: "Monitors",
    rating: 4.7,
    description: "32-inch 4K UHD monitor with stunning color and clarity, perfect for creative professionals.",
    inStock: true,
    badge: null,
    gallery: [
      "https://images.unsplash.com/photo-1527814223028-79532959582d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621463699039-366a7a530869?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1547082238-1a0b330c6a81?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Screen Size", value: "32-inch" },
      { label: "Resolution", value: "3840 x 2160 (4K)" },
      { label: "Panel Type", value: "IPS Black" },
      { label: "Ports", value: "HDMI, DisplayPort, USB-C" }
    ],
  },
  {
    id: 16,
    name: "Sonos Era 300 Speaker",
    price: 449.00,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1615150201538-062e7a33a39e?w=400&h=400&fit=crop",
    category: "Audio",
    rating: 4.8,
    description: "A revolutionary spatial audio speaker for immersive listening. Stream from all your favorite services.",
    inStock: true,
    badge: "Spatial Audio",
    gallery: [
      "https://images.unsplash.com/photo-1615150201538-062e7a33a39e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1599839498242-5e913a51f899?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1642142343213-33157e00a9a4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Audio", value: "Dolby Atmos" },
      { label: "Connectivity", value: "Wi-Fi, Bluetooth" },
      { label: "Controls", value: "Touch, Voice, App" },
      { label: "Woofers", value: "Four" }
    ],
  },
  {
    id: 17,
    name: "Logitech MX Master 3S",
    price: 99.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1615655425683-2c24c7f5c596?w=400&h=400&fit=crop",
    category: "Peripherals",
    rating: 4.9,
    description: "An iconic mouse, remastered. Experience ultimate comfort and performance with quiet clicks.",
    inStock: true,
    badge: null,
    gallery: [
      "https://images.unsplash.com/photo-1615655425683-2c24c7f5c596?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605273512122-d049f50641aa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1629429408209-1f9129f1db4f?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "DPI", value: "8000" },
      { label: "Scrolling", value: "MagSpeed Electromagnetic" },
      { label: "Connectivity", value: "Bluetooth, USB Bolt" },
      { label: "Battery", value: "Up to 70 days" }
    ],
  },
  {
    id: 18,
    name: "Kindle Paperwhite",
    price: 139.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1563815194303-a175370a97c4?w=400&h=400&fit=crop",
    category: "E-Readers",
    rating: 4.7,
    description: "Features a 6.8” display, thinner borders, an adjustable warm light, and weeks of battery life.",
    inStock: true,
    badge: "Waterproof",
    gallery: [
      "https://images.unsplash.com/photo-1563815194303-a175370a97c4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1456325504744-823816a7045b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1533669493593-35a84a6a51a8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1620004859816-f69a8441113c?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Display", value: "6.8-inch Paperwhite" },
      { label: "Resolution", value: "300 ppi" },
      { label: "Storage", value: "16 GB" },
      { label: "Waterproofing", value: "IPX8" }
    ],
  },
  {
    id: 19,
    name: "GoPro HERO12 Black",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1517456723-54523589c4a4?w=400&h=400&fit=crop",
    category: "Cameras",
    rating: 4.6,
    description: "Incredible image quality, even better HyperSmooth video stabilization, and a huge boost in battery life.",
    inStock: true,
    badge: "Action Cam",
    gallery: [
      "https://images.unsplash.com/photo-1517456723-54523589c4a4?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1695425667850-257a3e742116?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590651560942-0d1254a2f80c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1627055799335-779836515f21?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Video", value: "5.3K60 / 4K120" },
      { label: "Photo", value: "27MP" },
      { label: "Stabilization", value: "HyperSmooth 6.0" },
      { label: "Waterproof", value: "10m (33ft)" }
    ],
  },
  {
    id: 20,
    name: "Samsung T7 Shield Portable SSD",
    price: 159.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1678822497644-883a74980753?w=400&h=400&fit=crop",
    category: "Storage",
    rating: 4.8,
    description: "Rugged, fast, and compact. Get supreme performance on the go, even from challenging environments.",
    inStock: true,
    badge: "Durable",
    gallery: [
      "https://images.unsplash.com/photo-1678822497644-883a74980753?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1588631114532-a5214e1a3205?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580974913867-14c540121f52?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555435091-6b83f3647169?w=400&h=400&fit=crop"
    ],
    specs: [
      { label: "Capacity", value: "2TB" },
      { label: "Interface", value: "USB 3.2 Gen 2" },
      { label: "Read Speed", value: "Up to 1,050 MB/s" },
      { label: "Durability", value: "IP65 Water/Dust Resistant" }
    ],
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
