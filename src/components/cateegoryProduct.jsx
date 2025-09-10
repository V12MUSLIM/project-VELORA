import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/productContext.jsx";
import { title } from "../components/primitives.jsx";
import DefaultLayout from "../layouts/default.jsx";

// HeroUI components
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/breadcrumbs";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  Select,
  SelectItem,
} from "@heroui/select";

export default function CategoryPage({ category = "Audio" }) {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const categoryProducts = useMemo(() => {
    return products.filter((product) => product.category === category);
  }, [products, category]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    if (filterBy === "inStock") filtered = filtered.filter((p) => p.inStock);
    if (filterBy === "outOfStock") filtered = filtered.filter((p) => !p.inStock);

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    return filtered;
  }, [categoryProducts, sortBy, filterBy]);

  const handleProductClick = (productId) => navigate(`/shop/product/${productId}`);

  return (
    <DefaultLayout>
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 mb-6 lg:mb-8">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs className="text-xs sm:text-sm">
              <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
              <BreadcrumbItem onClick={() => navigate("/categories")}>Categories</BreadcrumbItem>
              <BreadcrumbItem isCurrent>{category}</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="mb-6">
            <h1 className={`${title()} text-2xl sm:text-3xl lg:text-4xl mb-2`}>
              {category}
            </h1>
            <p className="text-foreground-500 text-sm sm:text-base">
              Showing {filteredAndSortedProducts.length} products
            </p>
          </div>

          {/* Filters - Responsive Layout */}
          <div className="bg-content1 border rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Sort by:</span>
                <Select
                  aria-label="Sort products"
                  selectedKeys={[sortBy]}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full xs:w-40 sm:w-48"
                  size="sm"
                >
                  <SelectItem key="name" value="name">Name</SelectItem>
                  <SelectItem key="price-low" value="price-low">Price: Low to High</SelectItem>
                  <SelectItem key="price-high" value="price-high">Price: High to Low</SelectItem>
                  <SelectItem key="rating" value="rating">Rating</SelectItem>
                </Select>
              </div>

              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Filter:</span>
                <Select
                  aria-label="Filter products"
                  selectedKeys={[filterBy]}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full xs:w-40 sm:w-48"
                  size="sm"
                >
                  <SelectItem key="all" value="all">All Products</SelectItem>
                  <SelectItem key="inStock" value="inStock">In Stock</SelectItem>
                  <SelectItem key="outOfStock" value="outOfStock">Out of Stock</SelectItem>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-foreground-500 mb-4 text-sm sm:text-base">No products found</p>
              <Button 
                onClick={() => navigate("/shop")}
                size="sm"
                className="sm:size-md"
              >
                Browse All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <Card
                  isPressable
                  shadow="sm"
                  key={product.id}
                  onPress={() => handleProductClick(product.id)}
                  className="hover:shadow-lg transition-all duration-200 h-full flex flex-col"
                >
                  <CardHeader className="p-0 relative flex-shrink-0">
                    <div className="w-full aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&h=400&fit=crop";
                        }}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Status and Badge Chips */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        {!product.inStock && (
                          <Chip
                            color="danger"
                            size="sm"
                            variant="solid"
                            className="text-xs"
                          >
                            Out of Stock
                          </Chip>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {product.badge && (
                          <Chip
                            color="primary"
                            size="sm"
                            variant="solid"
                            className="text-xs"
                          >
                            {product.badge}
                          </Chip>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className="p-2 sm:p-3 flex-grow flex flex-col">
                    {/* Product Name */}
                    <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 leading-tight overflow-hidden">
                      <span className="line-clamp-2 sm:line-clamp-2">
                        {product.name}
                      </span>
                    </h3>

                    {/* Product Description - Hidden on mobile for space */}
                    <p className="hidden sm:block text-xs lg:text-sm text-foreground-500 mb-2 flex-grow overflow-hidden">
                      <span className="line-clamp-2">
                        {product.description}
                      </span>
                    </p>

                    {/* Price Section */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                          <span className="text-sm sm:text-base lg:text-lg font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs sm:text-sm line-through text-foreground-400">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Savings Chip */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="mt-1 sm:mt-2">
                          <Chip 
                            color="success" 
                            size="sm" 
                            variant="flat"
                            className="text-xs"
                          >
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}