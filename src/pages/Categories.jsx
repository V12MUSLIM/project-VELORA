import { useNavigate } from "react-router-dom";
import { Card, CardBody, Badge } from "@heroui/react";
import { useProducts } from "../contexts/productContext.jsx";
import { title } from "../components/primitives.jsx";
import DefaultLayout from "../layouts/default.jsx";

const categoryData = {
  Audio: {
    image: "headset.jpeg",
    description: "Headphones, Speakers & Audio Equipment",
    color: "primary",
  },
  Computers: {
    image: "laptop.jpeg",
    description: "Laptops, Desktops & Computing Solutions",
    color: "secondary",
  },
  Cameras: {
    image: "camera.jpeg",
    description: "Professional Cameras & Photography Gear",
    color: "success",
  },
  TVs: { 
    image: "tv.jpeg", 
    description: "Smart TVs & Display Technology",
    color: "warning",
  },
  Gaming: {
    image: "tower.jpeg",
    description: "Gaming Consoles, PCs & Accessories",
    color: "danger",
  },
  Tablets: {
    image: "tablet.jpeg",
    description: "iPads, Android Tablets & More",
    color: "primary",
  },
  Drones: {
    image: "drone.jpeg",
    description: "Professional & Consumer Drones",
    color: "secondary",
  },
  Smartphones: {
    image: "phone.jpeg",
    description: "Latest Smartphones & Mobile Devices",
    color: "success",
  },
  Wearables: {
    image: "watch.jpeg",
    description: "Smartwatches & Fitness Trackers",
    color: "warning",
  },
  "VR/AR": { 
    image: "vr.jpeg", 
    description: "Virtual & Augmented Reality",
    color: "danger",
  },
  Components: { 
    image: "gpu.jpeg", 
    description: "PC Components & Hardware",
    color: "primary",
  },
  Peripherals: {
    image: "mouse.jpg",
    description: "Keyboards, Mice & Accessories",
    color: "secondary",
  },
  Monitors: {
    image: "monitor.jpg",
    description: "Gaming & Professional Monitors",
    color: "success",
  },
  Storage: {
    image: "storage.jpg",
    description: "SSDs, HDDs & Storage Solutions",
    color: "warning",
  },
  "E-Readers": {
    image: "E-reader.jpg",
    description: "Kindle & Digital Reading Devices",
    color: "danger",
  },
};

export default function Categories() {
  const { products } = useProducts();
  const navigate = useNavigate();

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryClick = (category) => {
    const encodedCategory = encodeURIComponent(category);
    navigate(`/category/${encodedCategory}`);
  };

  const getImageSrc = (categoryInfo) => {
    if (categoryInfo.image.startsWith("http")) return categoryInfo.image;
    const basePath = import.meta.env.BASE_URL || "";
    return `${basePath}${categoryInfo.image}`;
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center px-4">
          <h1 className={title()}>Shop by Category</h1>
          <p className="text-lg text-default-600 mt-4 max-w-2xl mx-auto">
            Discover our wide range of premium tech products across different
            categories
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl px-4">
          {uniqueCategories.map((category) => {
            const categoryInfo = categoryData[category] || {
              image: "https://placehold.co/600x400?text=No+Image",
              description: "Premium Tech Products",
              color: "default",
            };

            const productCount = products.filter(
              (p) => p.category === category
            ).length;

            return (
              <Card
                key={category}
                isPressable
                isHoverable
                onPress={() => handleCategoryClick(category)}
                className="group cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
                shadow="md"
              >
                {/* Image container with badge overlay */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={getImageSrc(categoryInfo)}
                    alt={category}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  {/* Product count badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      content={productCount}
                      color={categoryInfo.color}
                      variant="solid"
                      size="lg"
                      className="text-white font-medium"
                    >
                      <span className="text-xs px-1">items</span>
                    </Badge>
                  </div>
                </div>

                {/* Card body */}
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {category}
                    </h3>
                  </div>
                  
                  <p className="text-default-500 text-sm mb-4 line-clamp-2">
                    {categoryInfo.description}
                  </p>
                  
                  {/* Action indicator */}
                  <div className="flex items-center justify-between">
                    <Badge
                      color={categoryInfo.color}
                      variant="flat"
                      size="sm"
                    >
                      {category}
                    </Badge>
                    
                    <div className="flex items-center text-primary font-medium group-hover:text-primary-600">
                      <span className="text-sm">Shop Now</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="text-center mt-8 px-4">
          <p className="text-default-500">
            Can't find what you're looking for?
            <button
              onClick={() => navigate("/shop")}
              className="text-primary hover:text-primary-600 ml-1 font-medium transition-colors"
            >
              Browse all products
            </button>
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}