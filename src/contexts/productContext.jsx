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
      image:
        "https://www.powerhouse.je/images/products/1728466641-19729000.jpg",
      category: "Audio",
      rating: 4.8,
      description:
        "Premium wireless headphones with industry-leading noise cancellation and Hi-Res Audio.",
      inStock: true,
      badge: "Premium",
      gallery: [
        "https://www.powerhouse.je/images/products/1728466641-19729000.jpg",
        "https://valueelectronics.com/wp-content/uploads/2022/05/WH-1000XM5_keyvisual_silver-Large-scaled.jpg",
        "https://m.media-amazon.com/images/I/51aXvjzcukL.jpg",
        "https://down-my.img.susercontent.com/file/my-11134207-7rasb-mczta1crull1a2",
      ],
      specs: [
        { label: "Weight", value: "250g" },
        { label: "Battery Life", value: "30 hours" },
        { label: "Connectivity", value: "Bluetooth 5.2" },
        { label: "Driver Size", value: "40mm" },
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
      description:
        "Apple's most powerful laptop with M2 Max chip, 32GB RAM, 1TB SSD.",
      inStock: true,
      badge: "Pro",
      gallery: [
        "https://m.media-amazon.com/images/I/61s6UawAo5L.jpg",
        "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111932_sp809-mbp16touch-silver-2019.jpeg",
        "https://powermaccenter.com/cdn/shop/files/MacBook_Pro_16_in_M3_Pro_Max_Silver_PDP_Image_Position_9__en-US_ccf12470-f3eb-4dcb-b479-9ed09409d1d1.jpg?v=1699060994&width=823",
        "https://atlas-content-cdn.pixelsquid.com/assets_v2/334/3346292713464010351/jpeg-600/G03.jpg?modifiedAt=1",
      ],
      specs: [
        { label: "CPU", value: "Apple M2 Max" },
        { label: "RAM", value: "32GB" },
        { label: "Storage", value: "1TB SSD" },
        { label: "Screen", value: "16-inch Retina Display" },
      ],
    },
    {
      id: 3,
      name: "Canon EOS R5",
      price: 3899.99,
      originalPrice: 4199.99,
      image:
        "https://images-cdn.ubuy.tn/6434507302e2e73ab771c04e-canon-eos-r5-c-mirrorless-cinema-camera.jpg",
      category: "Cameras",
      rating: 4.7,
      description: "45MP full-frame mirrorless camera with 8K video recording.",
      inStock: true,
      badge: "Professional",
      gallery: [
        "https://cdn.media.amplience.net/i/canon/eos-r5_front_rf24-105mmf4lisusm_square_32c26ad194234d42b3cd9e582a21c99b",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Resolution", value: "45MP" },
        { label: "Video", value: "8K RAW" },
        { label: "Sensor", value: "Full Frame CMOS" },
        { label: "Stabilization", value: "In-body 5-axis" },
      ],
    },
    {
      id: 4,
      name: "Samsung Neo QLED 8K TV",
      price: 4999.99,
      originalPrice: 5499.99,
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-546784817?$Q90_684_547_JPG$",
      category: "TVs",
      rating: 4.8,
      description: "75-inch 8K Smart TV with Quantum Matrix Technology.",
      inStock: true,
      badge: "Premium",
      gallery: [
        "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-546784817?$Q90_684_547_JPG$",
        "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-548130719?$Q90_684_547_JPG$",
        "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-548130761?$Q90_684_547_JPG$",
        "https://images.samsung.com/is/image/samsung/p6pim/eg/qa85qn85fauxeg/gallery/eg-qled-qn85f-qa85qn85fauxeg-548130761?$Q90_684_547_JPG$",
      ],
      specs: [
        { label: "Screen Size", value: "75-inch" },
        { label: "Resolution", value: "8K" },
        { label: "HDR", value: "HDR10+" },
        { label: "Smart TV", value: "Yes" },
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
        "https://m.media-amazon.com/images/I/71xgVVsyfoL._AC_SY450_.jpg",
      ],
      specs: [
        { label: "GPU", value: "NVIDIA RTX 4090" },
        { label: "CPU", value: "Intel i9-13900K" },
        { label: "RAM", value: "64GB DDR5" },
        { label: "Storage", value: "2TB NVMe SSD" },
      ],
    },
    {
      id: 6,
      name: "iPad Pro 12.9-inch M2",
      price: 1299.99,
      originalPrice: 1399.99,
      image:
        "https://m.media-amazon.com/images/I/81c+9BOQNWL._UF894,1000_QL80_.jpg",
      category: "Tablets",
      rating: 4.8,
      description: "Latest iPad Pro with M2 chip, 256GB, Wi-Fi + 5G.",
      inStock: true,
      badge: "Pro",
      gallery: [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1603899124588-0b9b9add4ef7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587427998493-e3492a593366?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Chip", value: "Apple M2" },
        { label: "Storage", value: "256GB" },
        { label: "Display", value: "12.9-inch Liquid Retina" },
        { label: "Connectivity", value: "Wi-Fi + 5G" },
      ],
    },
    {
      id: 7,
      name: "DJI Mavic 3 Pro",
      price: 2199.99,
      originalPrice: 2499.99,
      image:
        "https://i.ytimg.com/vi/r5kukRMmZNI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKjErw_ZhhZ1tlsBNAaEmG6n-OGw",
      category: "Drones",
      rating: 4.7,
      description: "Professional drone with Hasselblad camera and 5.1K video.",
      inStock: true,
      badge: "Pro",
      gallery: [
        "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1594151261510-0bdb00dbe5f0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1527153935397-5a1a69d71a14?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1557015522-850a1cbc7f14?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Camera", value: "Hasselblad 20MP" },
        { label: "Video", value: "5.1K" },
        { label: "Flight Time", value: "46 minutes" },
        { label: "Range", value: "15 km" },
      ],
    },
    {
      id: 8,
      name: "Sony A95K QD-OLED",
      price: 2999.99,
      originalPrice: 3299.99,
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      category: "TVs",
      rating: 4.9,
      description: "65-inch 4K QD-OLED TV with cognitive processor XR.",
      inStock: true,
      badge: "Premium",
      gallery: [
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1516714435131-44d6a96e7e85?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1629131723466-b6b6a33b9347?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1626294281315-9f550953a7b7?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Screen Size", value: "65-inch" },
        { label: "Resolution", value: "4K" },
        { label: "Panel", value: "QD-OLED" },
        { label: "Processor", value: "Cognitive XR" },
      ],
    },
    {
      id: 9,
      name: "NVIDIA RTX 4090",
      price: 1999.99,
      originalPrice: 2199.99,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41Gv9i8b1ML._SL500_._AC_SL500_.jpg",
      category: "Components",
      rating: 4.8,
      description: "Ultimate graphics card with 24GB GDDR6X memory.",
      inStock: false,
      badge: "Limited",
      gallery: [
        "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1635323273197-d6468d8bcee2?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1664379736173-1959778265a7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "CUDA Cores", value: "16384" },
        { label: "Memory", value: "24GB GDDR6X" },
        { label: "Boost Clock", value: "2.5GHz" },
        { label: "Power", value: "450W" },
      ],
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      price: 3499.99,
      originalPrice: null,
      image: "https://m.media-amazon.com/images/I/61DHhx94qSL.jpg",
      category: "VR/AR",
      rating: 4.9,
      description:
        "Revolutionary spatial computing device with M2 and R1 chips.",
      inStock: false,
      badge: "New",
      gallery: [
        "https://images.unsplash.com/photo-1695328224345-d6c56a5c68b7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1695328224522-813c983416b6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1707157299096-03615e449942?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1675786733281-22e43f5505e6?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Chipset", value: "Apple M2 + R1" },
        { label: "Display", value: "Micro-OLED" },
        { label: "Storage", value: "256GB / 512GB / 1TB" },
        { label: "Connectivity", value: "Wi-Fi 6E" },
      ],
    },

    // --- New Products ---
    {
      id: 11,
      name: "Apple Watch Ultra 2",
      price: 799.0,
      originalPrice: 849.0,
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ultra-case-unselect-gallery-1-202409_FMT_WHH?wid=752&hei=720&fmt=jpeg&qlt=90&.v=1723905852634",
      category: "Wearables",
      rating: 4.9,
      description:
        "The most rugged and capable Apple Watch ever. Designed for endurance, exploration, and adventure.",
      inStock: true,
      badge: "Rugged",
      gallery: [
        "https://images.unsplash.com/photo-1695026402518-a6d130b0579e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1694931969239-3220f18c650e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1678830491762-3c13254585c4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1664403300329-079d39125679?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Case Size", value: "49mm" },
        { label: "Material", value: "Titanium" },
        { label: "Water Resistance", value: "100m" },
        { label: "Battery", value: "Up to 36 hours" },
      ],
    },
    {
      id: 12,
      name: "PlayStation 5 Console",
      price: 499.99,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      category: "Gaming",
      rating: 4.8,
      description:
        "Experience lightning-fast loading with an ultra-high-speed SSD and deeper immersion with haptic feedback.",
      inStock: false,
      badge: "Best Seller",
      gallery: [
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1620392124302-9a3802796444?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1611916656173-875e4277bea6?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Storage", value: "825GB SSD" },
        { label: "CPU", value: "AMD Zen 2" },
        { label: "GPU", value: "AMD RDNA 2" },
        { label: "Resolution", value: "Up to 8K" },
      ],
    },
    {
      id: 13,
      name: "Samsung Galaxy S25 Ultra",
      price: 1199.99,
      originalPrice: 1299.99,
      image: "https://m.media-amazon.com/images/I/31MwXwFvwOL._SL500_.jpg",
      category: "Smartphones",
      rating: 4.9,
      description:
        "The ultimate smartphone with a pro-grade camera, intelligent battery, and a stunning Dynamic AMOLED 2X display.",
      inStock: true,
      badge: "New",
      gallery: [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1610945265064-0e34e5a1b3b4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1611403554313-2272a445d212?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Screen", value: "6.8-inch Dynamic AMOLED" },
        { label: "Camera", value: "200MP Wide" },
        { label: "Processor", value: "Snapdragon 8 Gen 3" },
        { label: "Battery", value: "5000mAh" },
      ],
    },
    {
      id: 14,
      name: "Logitech MX Keys S",
      price: 109.99,
      originalPrice: null,
      image:
        "https://m.media-amazon.com/images/I/51Zvqf8DxPL._UF894,1000_QL80_.jpg",
      category: "Peripherals",
      rating: 4.8,
      description:
        "Advanced wireless illuminated keyboard with smart keys for a fluid typing experience.",
      inStock: true,
      badge: "Popular",
      gallery: [
        "https://images.unsplash.com/photo-1601619623637-9571f33f11d3?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595044845814-1f5445218206?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1618384887924-3c5b3d2eda05?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Connectivity", value: "Bluetooth, USB-C" },
        { label: "Backlighting", value: "Smart Illumination" },
        { label: "Battery", value: "Up to 10 days" },
        { label: "Compatibility", value: "macOS, Windows, Linux" },
      ],
    },
    {
      id: 15,
      name: "Dell UltraSharp 4K Monitor",
      price: 759.99,
      originalPrice: 899.99,
      image:
        "https://i5.walmartimages.com/seo/Dell-27-60-Hz-IPS-Black-Technology-UHD-IPS-Monitor-8-ms-gray-to-gray-normal-5-ms-gray-to-gray-fast-3840-x-2160-4K-HDMI-DisplayPort-USB-Audio-Flat-Pan_da30d5dd-66cf-4f1f-a028-4807088fa3ac.85212000719ad54459b2996f8cc0f41d.jpeg",
      category: "Monitors",
      rating: 4.7,
      description:
        "32-inch 4K UHD monitor with stunning color and clarity, perfect for creative professionals.",
      inStock: true,
      badge: null,
      gallery: [
        "https://images.unsplash.com/photo-1527814223028-79532959582d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1621463699039-366a7a530869?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1547082238-1a0b330c6a81?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Screen Size", value: "32-inch" },
        { label: "Resolution", value: "3840 x 2160 (4K)" },
        { label: "Panel Type", value: "IPS Black" },
        { label: "Ports", value: "HDMI, DisplayPort, USB-C" },
      ],
    },
    {
      id: 16,
      name: "Sonos Era 300 Speaker",
      price: 449.0,
      originalPrice: null,
      image:
        "https://m.media-amazon.com/images/I/71bLHBqjOoL._UF894,1000_QL80_.jpg",
      category: "Audio",
      rating: 4.8,
      description:
        "A revolutionary spatial audio speaker for immersive listening. Stream from all your favorite services.",
      inStock: true,
      badge: "Spatial Audio",
      gallery: [
        "https://images.unsplash.com/photo-1615150201538-062e7a33a39e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1599839498242-5e913a51f899?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1642142343213-33157e00a9a4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Audio", value: "Dolby Atmos" },
        { label: "Connectivity", value: "Wi-Fi, Bluetooth" },
        { label: "Controls", value: "Touch, Voice, App" },
        { label: "Woofers", value: "Four" },
      ],
    },
    {
      id: 17,
      name: "Logitech MX Master 3S",
      price: 99.99,
      originalPrice: 109.99,
      image:
        "https://www.dokkantech.com/cdn/shop/files/mx-master-3s-mouse-top-view-pale-gray_1.jpg?v=1718107918",
      category: "Peripherals",
      rating: 4.9,
      description:
        "An iconic mouse, remastered. Experience ultimate comfort and performance with quiet clicks.",
      inStock: true,
      badge: null,
      gallery: [
        "https://images.unsplash.com/photo-1615655425683-2c24c7f5c596?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1605273512122-d049f50641aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1629429408209-1f9129f1db4f?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "DPI", value: "8000" },
        { label: "Scrolling", value: "MagSpeed Electromagnetic" },
        { label: "Connectivity", value: "Bluetooth, USB Bolt" },
        { label: "Battery", value: "Up to 70 days" },
      ],
    },
    {
      id: 18,
      name: "Kindle Paperwhite",
      price: 139.99,
      originalPrice: null,
      image:
        "https://target.scene7.com/is/image/Target/GUEST_c2e75019-a561-404c-b109-6a529919047c?wid=800&hei=800&qlt=80&fmt=pjpeg",
      category: "E-Readers",
      rating: 4.7,
      description:
        "Features a 6.8” display, thinner borders, an adjustable warm light, and weeks of battery life.",
      inStock: true,
      badge: "Waterproof",
      gallery: [
        "https://images.unsplash.com/photo-1563815194303-a175370a97c4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1456325504744-823816a7045b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1533669493593-35a84a6a51a8?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1620004859816-f69a8441113c?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Display", value: "6.8-inch Paperwhite" },
        { label: "Resolution", value: "300 ppi" },
        { label: "Storage", value: "16 GB" },
        { label: "Waterproofing", value: "IPX8" },
      ],
    },
    {
      id: 19,
      name: "GoPro HERO12 Black",
      price: 399.99,
      originalPrice: 449.99,
      image:
        "https://i5.walmartimages.com/asr/04d03d13-5ed4-4c45-bcc9-233d5ef9a3f5.49f9101c60295d26b28b9a5d664e14b0.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      category: "Cameras",
      rating: 4.6,
      description:
        "Incredible image quality, even better HyperSmooth video stabilization, and a huge boost in battery life.",
      inStock: true,
      badge: "Action Cam",
      gallery: [
        "https://images.unsplash.com/photo-1517456723-54523589c4a4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1695425667850-257a3e742116?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590651560942-0d1254a2f80c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1627055799335-779836515f21?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Video", value: "5.3K60 / 4K120" },
        { label: "Photo", value: "27MP" },
        { label: "Stabilization", value: "HyperSmooth 6.0" },
        { label: "Waterproof", value: "10m (33ft)" },
      ],
    },
    {
      id: 20,
      name: "Samsung T7 Shield Portable SSD",
      price: 159.99,
      originalPrice: 189.99,
      image:
        "https://tv-it.com/storage/shada/corsair-ram/samsung-t7-shield-mu-pe1t0s-p2.webp",
      category: "Storage",
      rating: 4.8,
      description:
        "Rugged, fast, and compact. Get supreme performance on the go, even from challenging environments.",
      inStock: true,
      badge: "Durable",
      gallery: [
        "https://images.unsplash.com/photo-1678822497644-883a74980753?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1588631114532-a5214e1a3205?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580974913867-14c540121f52?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1555435091-6b83f3647169?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Capacity", value: "2TB" },
        { label: "Interface", value: "USB 3.2 Gen 2" },
        { label: "Read Speed", value: "Up to 1,050 MB/s" },
        { label: "Durability", value: "IP65 Water/Dust Resistant" },
      ],
    },
    // --- Mockup Products (21 - 40) ---
    {
      id: 21,
      name: "Bose QuietComfort 45 Wireless Headphones",
      price: 329,
      originalPrice: 379,
      image: "https://i5.walmartimages.com/seo/Bose-QuietComfort-45-Wireless-Noise-Cancelling-Headphones-Black_48e15895-cb0c-4a8a-b852-4c52dca7692a.5f403bdd71947a437bd6c8bafbb6b8d4.jpeg",
      category: "Audio",
      rating: 4.7,
      description:
        "Comfortable over-ear headphones with world-class noise cancellation and balanced audio.",
      inStock: true,
      badge: "Top Rated",
      gallery: [
        "https://i5.walmartimages.com/seo/Bose-QuietComfort-45-Wireless-Noise-Cancelling-Headphones-Black_48e15895-cb0c-4a8a-b852-4c52dca7692a.5f403bdd71947a437bd6c8bafbb6b8d4.jpeg",
        "/images/product21-2.jpg",
        "/images/product21-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "Bose" },
        { label: "Model", value: "QuietComfort 45" },
        { label: "Battery Life", value: "24 hours" },
        { label: "Connectivity", value: "Bluetooth 5.1" },
        { label: "Warranty", value: "1 year" },
      ],
    },

    {
      id: 22,
      name: "Dell XPS 15 Laptop",
      price: 1899,
      originalPrice: 2099,
      image: "https://cdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad,format=webp,quality=70/assets/7/3/6/a/736a7005910f10cf65066917551ac959afdd9a8b_S100715648_1.jpg",
      category: "Computers",
      rating: 4.7,
      description:
        "Powerful laptop with stunning 4K display, ideal for creators and professionals.",
      inStock: true,
      badge: "Hot Deal",
      gallery: [
        "https://cdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad,format=webp,quality=70/assets/7/3/6/a/736a7005910f10cf65066917551ac959afdd9a8b_S100715648_1.jpg",
        "/images/product22-2.jpg",
        "/images/product22-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "Dell" },
        { label: "Model", value: "XPS 15" },
        { label: "Processor", value: "Intel i7 13th Gen" },
        { label: "RAM", value: "16GB" },
        { label: "Storage", value: "512GB SSD" },
      ],
    },
    {
      id: 23,
      name: "Canon EOS R10 Mirrorless Camera",
      price: 1099,
      originalPrice: 1249,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDL5lxjg0zVED2UVGzwNDgG-4HbRfn7qHaqg&s",
      category: "Cameras",
      rating: 4.6,
      description:
        "Lightweight mirrorless camera with fast autofocus and 4K video recording.",
      inStock: true,
      badge: "New Arrival",
      gallery: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDL5lxjg0zVED2UVGzwNDgG-4HbRfn7qHaqg&s",
        "/images/product23-2.jpg",
        "/images/product23-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "Canon" },
        { label: "Model", value: "EOS R10" },
        { label: "Sensor", value: "24.2MP APS-C" },
        { label: "Video", value: "4K 60fps" },
        { label: "Warranty", value: "2 years" },
      ],
    },
    {
      id: 24,
      name: "Samsung Neo QLED 65” 4K TV",
      price: 1499,
      originalPrice: 1699,
      image: "https://image-us.samsung.com/SamsungUS/home/television-home-theater/tvs/samsung-neo-qled-4k/07252024/QN85QNX1DAFXZA-S.COM_Version_1_V01.jpg?$product-details-jpg$",
      category: "TVs",
      rating: 4.9,
      description:
        "Vivid colors and ultra-slim design with next-gen Neo QLED technology.",
      inStock: true,
      badge: "Top Rated",
      gallery: [
        "https://image-us.samsung.com/SamsungUS/home/television-home-theater/tvs/samsung-neo-qled-4k/07252024/QN85QNX1DAFXZA-S.COM_Version_1_V01.jpg?$product-details-jpg$",
        "/images/product24-2.jpg",
        "/images/product24-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "Samsung" },
        { label: "Model", value: "Neo QLED QN90B" },
        { label: "Resolution", value: "4K UHD" },
        { label: "Size", value: "65 inches" },
        { label: "Warranty", value: "2 years" },
      ],
    },
    {
      id: 25,
      name: "PlayStation 5 Slim",
      price: 499,
      originalPrice: 549,
      image: "https://btech.com/media/catalog/product/cache/7a1c3ac7529779766fe048df0162aaaf/1/6/16677fba1a4743540258971c480afe51893969e9e34bb5fd5dd182aa003a96a5.jpeg",
      category: "Gaming",
      rating: 4.9,
      description:
        "Next-gen gaming console with lightning-fast load times and immersive 4K gameplay.",
      inStock: true,
      badge: "Limited Stock",
      gallery: [
        "https://2b.com.eg/media/catalog/product/cache/661473ab953cdcdf4c3b607144109b90/g/m/gm511-min_1.jpg",
        "/images/product25-2.jpg",
        "/images/product25-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "Sony" },
        { label: "Model", value: "PS5 Slim" },
        { label: "Storage", value: "1TB SSD" },
        { label: "Resolution", value: "4K HDR" },
        { label: "Warranty", value: "1 year" },
      ],
    },
    {
      id: 26,
      name: "iPad Pro 12.9” (M2)",
      price: 1099,
      originalPrice: 1199,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB7jhe_WL_AGo6OzBQ2tYPKP-394kSMgVQ1g&s",
      category: "Tablets",
      rating: 4.8,
      description:
        "Powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
      inStock: true,
      badge: "Editor’s Choice",
      gallery: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB7jhe_WL_AGo6OzBQ2tYPKP-394kSMgVQ1g&s",
        "/images/product26-2.jpg",
        "/images/product26-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "Apple" },
        { label: "Model", value: "iPad Pro M2" },
        { label: "Display", value: "12.9-inch Liquid Retina" },
        { label: "Storage", value: "256GB" },
        { label: "Warranty", value: "1 year" },
      ],
    },
    {
      id: 27,
      name: "DJI Mini 3 Pro Drone",
      price: 759,
      originalPrice: 849,
      image: "https://cdn.salla.sa/Kozd/kpryl7ev3XBfsrDSuV9VLSmOS6IzYRTEj1MoSNWo.jpg",
      category: "Drones",
      rating: 4.7,
      description:
        "Compact drone with advanced obstacle avoidance and stunning 4K HDR video.",
      inStock: true,
      badge: "Lightweight",
      gallery: [
        "https://shop.tekobroadcast.com/2572-superlarge_default/dji-mini-3-pro-drone.jpg",
        "/images/product27-2.jpg",
        "/images/product27-3.jpg",
      ],
      specs: [
        { label: "Brand", value: "DJI" },
        { label: "Model", value: "Mini 3 Pro" },
        { label: "Camera", value: "48MP 4K HDR" },
        { label: "Flight Time", value: "34 mins" },
        { label: "Warranty", value: "1 year" },
      ],
    },
    {
      id: 28,
      name: "Bose QuietComfort Ultra Earbuds",
      price: 299.99,
      originalPrice: 329.99,
      image:
        "https://m.media-amazon.com/images/I/51DOzlkiBTL.jpg",
      category: "Audio",
      rating: 4.7,
      description:
        "Premium noise-cancelling earbuds with immersive spatial audio and long battery life.",
      inStock: true,
      badge: "New",
      gallery: [
        "https://m.media-amazon.com/images/I/51DOzlkiBTL.jpg",
        "https://images.unsplash.com/photo-1611080626919-7cfad81d4dbe?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606813907299-68dfd6edc1d5?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Battery Life", value: "24 hours" },
        { label: "Connectivity", value: "Bluetooth 5.3" },
        { label: "Water Resistance", value: "IPX4" },
      ],
    },
    {
      id: 29,
      name: "Razer Blade 18 Gaming Laptop",
      price: 3599.99,
      originalPrice: 3899.99,
      image:
        "https://m.media-amazon.com/images/I/71qU4gvFPFL._UF894,1000_QL80_.jpg",
      category: "Computers",
      rating: 4.8,
      description:
        "Ultimate gaming laptop with RTX 4090 GPU and Intel i9 processor.",
      inStock: true,
      badge: "Ultimate",
      gallery: [
        "https://m.media-amazon.com/images/I/71qU4gvFPFL._UF894,1000_QL80_.jpg",
        "https://images.unsplash.com/photo-1612831817057-dedadd48b36b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "GPU", value: "RTX 4090" },
        { label: "CPU", value: "Intel i9-13950HX" },
        { label: "RAM", value: "32GB DDR5" },
        { label: "Storage", value: "2TB NVMe SSD" },
      ],
    },
    {
      id: 30,
      name: "Fujifilm X-H2S",
      price: 2499.99,
      originalPrice: 2699.99,
      image:
        "https://fujifilm-dsc.com/en/manual/x-h2s/images/img_main01_x-h2s.png",
      category: "Cameras",
      rating: 4.6,
      description:
        "Flagship APS-C camera with 40fps burst shooting and advanced autofocus.",
      inStock: true,
      badge: "Pro",
      gallery: [
        "https://fujifilm-dsc.com/en/manual/x-h2s/images/img_main01_x-h2s.png",
        "https://images.unsplash.com/photo-1558185348-16f001b09bda?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8e8e6fc4?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Resolution", value: "26MP" },
        { label: "Video", value: "6.2K" },
        { label: "Sensor", value: "APS-C X-Trans CMOS 5" },
      ],
    },
    {
      id: 31,
      name: "LG OLED G3 77-inch TV",
      price: 3499.99,
      originalPrice: 3799.99,
      image:
        "https://www.lg.com/content/dam/channel/wcms/my/images/tvs/oled77g3psa_ats_eaml_my_c/gallery/1600-G3.jpg",
      category: "TVs",
      rating: 4.9,
      description:
        "Gallery design OLED TV with MLA technology and infinite contrast.",
      inStock: true,
      badge: "Premium",
      gallery: [
        "https://www.lg.com/content/dam/channel/wcms/my/images/tvs/oled77g3psa_ats_eaml_my_c/gallery/1600-G3.jpg",
        "https://images.unsplash.com/photo-1629131723466-b6b6a33b9347?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580910051074-7e3b99387f29?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Screen Size", value: "77-inch" },
        { label: "Resolution", value: "4K UHD" },
        { label: "Panel", value: "OLED Evo" },
      ],
    },
    {
      id: 32,
      name: "Alienware Aurora R16 Desktop",
      price: 2799.99,
      originalPrice: 2999.99,
      image:
        "https://images-cdn.ubuy.com.sa/6604f2e7bc8ba0730807dd97-alienware-aurora-r16-desktop-4tb-ssd.jpg",
      category: "Gaming",
      rating: 4.8,
      description:
        "High-performance desktop with liquid cooling and futuristic design.",
      inStock: true,
      badge: "Gaming Beast",
      gallery: [
        "https://images-cdn.ubuy.com.sa/6604f2e7bc8ba0730807dd97-alienware-aurora-r16-desktop-4tb-ssd.jpg",
        "https://images.unsplash.com/photo-1629429408209-1f9129f1db4f?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587202372775-989c31c0a252?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "GPU", value: "RTX 4080" },
        { label: "CPU", value: "Intel i9-13900KF" },
        { label: "RAM", value: "32GB DDR5" },
        { label: "Storage", value: "1TB NVMe SSD" },
      ],
    },
    {
      id: 33,
      name: "iPad Air 2024",
      price: 699.99,
      originalPrice: 749.99,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      category: "Tablets",
      rating: 4.7,
      description: "Lightweight tablet with M2 chip and Apple Pencil support.",
      inStock: true,
      badge: "Popular",
      gallery: [
        "https://images.unsplash.com/photo-1587427998493-e3492a593366?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1603899124588-0b9b9add4ef7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Chip", value: "Apple M2" },
        { label: "Storage", value: "128GB" },
        { label: "Display", value: "10.9-inch Liquid Retina" },
      ],
    },
    {
      id: 34,
      name: "DJI Air 3 Drone",
      price: 1199.99,
      originalPrice: 1299.99,
      image:
        "https://images.unsplash.com/photo-1527153935397-5a1a69d71a14?w=400&h=400&fit=crop",
      category: "Drones",
      rating: 4.6,
      description:
        "Compact drone with dual-camera system and omnidirectional obstacle sensing.",
      inStock: true,
      badge: "Travel",
      gallery: [
        "https://images.unsplash.com/photo-1527153935397-5a1a69d71a14?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1594151261510-0bdb00dbe5f0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Camera", value: "48MP Wide + 48MP Tele" },
        { label: "Video", value: "4K/100fps" },
        { label: "Flight Time", value: "46 minutes" },
      ],
    },
    {
      id: 35,
      name: "Google Pixel 9 Pro",
      price: 1099.99,
      originalPrice: 1199.99,
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
      category: "Smartphones",
      rating: 4.8,
      description:
        "Flagship Pixel phone with AI-powered photography and Tensor G4 chip.",
      inStock: true,
      badge: "AI",
      gallery: [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1611403554313-2272a445d212?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Screen", value: "6.7-inch OLED" },
        { label: "Camera", value: "50MP + 48MP + 12MP" },
        { label: "Chipset", value: "Google Tensor G4" },
      ],
    },
    {
      id: 36,
      name: "Garmin Fenix 7 Pro",
      price: 899.99,
      originalPrice: 949.99,
      image:
        "https://images.unsplash.com/photo-1664403300329-079d39125679?w=400&h=400&fit=crop",
      category: "Wearables",
      rating: 4.8,
      description: "Advanced multisport GPS smartwatch with solar charging.",
      inStock: true,
      badge: "Adventure",
      gallery: [
        "https://images.unsplash.com/photo-1664403300329-079d39125679?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1694931969239-3220f18c650e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1678830491762-3c13254585c4?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Case Size", value: "47mm" },
        { label: "Battery", value: "Up to 18 days" },
        { label: "Water Resistance", value: "100m" },
      ],
    },
    {
      id: 37,
      name: "Valve Index VR Kit",
      price: 999.99,
      originalPrice: 1099.99,
      image:
        "https://images.unsplash.com/photo-1606813637783-7c32956543a5?w=400&h=400&fit=crop",
      category: "VR/AR",
      rating: 4.7,
      description:
        "High-fidelity VR headset with advanced controllers and wide FOV.",
      inStock: false,
      badge: "VR Pro",
      gallery: [
        "https://images.unsplash.com/photo-1606813637783-7c32956543a5?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1695328224345-d6c56a5c68b7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1707157299096-03615e449942?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Resolution", value: "1440x1600 per eye" },
        { label: "Refresh Rate", value: "120Hz / 144Hz" },
        { label: "FOV", value: "130°" },
      ],
    },
    {
      id: 38,
      name: "WD Black SN850X NVMe SSD",
      price: 229.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1580974913867-14c540121f52?w=400&h=400&fit=crop",
      category: "Storage",
      rating: 4.9,
      description:
        "High-performance PCIe Gen4 SSD for gaming and productivity.",
      inStock: true,
      badge: "Speed",
      gallery: [
        "https://images.unsplash.com/photo-1580974913867-14c540121f52?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1678822497644-883a74980753?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1555435091-6b83f3647169?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Capacity", value: "2TB" },
        { label: "Read Speed", value: "7300MB/s" },
        { label: "Interface", value: "PCIe Gen4" },
      ],
    },
    {
      id: 39,
      name: "Kindle Oasis",
      price: 249.99,
      originalPrice: 279.99,
      image:
        "https://images.unsplash.com/photo-1456325504744-823816a7045b?w=400&h=400&fit=crop",
      category: "E-Readers",
      rating: 4.8,
      description:
        "Premium e-reader with adjustable warm light and ergonomic design.",
      inStock: true,
      badge: "Premium",
      gallery: [
        "https://images.unsplash.com/photo-1456325504744-823816a7045b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1533669493593-35a84a6a51a8?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563815194303-a175370a97c4?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Display", value: "7-inch Paperwhite" },
        { label: "Resolution", value: "300 ppi" },
        { label: "Storage", value: "32 GB" },
      ],
    },
    {
      id: 40,
      name: "GoPro MAX 360",
      price: 499.99,
      originalPrice: 549.99,
      image:
        "https://images.unsplash.com/photo-1517456723-54523589c4a4?w=400&h=400&fit=crop",
      category: "Cameras",
      rating: 4.7,
      description:
        "360-degree action camera with Max HyperSmooth stabilization and immersive capture.",
      inStock: true,
      badge: "360 Cam",
      gallery: [
        "https://images.unsplash.com/photo-1517456723-54523589c4a4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1695425667850-257a3e742116?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590651560942-0d1254a2f80c?w=400&h=400&fit=crop",
      ],
      specs: [
        { label: "Video", value: "5.6K30" },
        { label: "Photo", value: "16.6MP" },
        { label: "Waterproof", value: "5m (16ft)" },
      ],
    },
  ]);

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
