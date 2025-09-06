// src/pages/ProductDetails.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../contexts/productContext";
import DefaultLayout from "../layouts/default";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Skeleton,
  Image,
} from "@heroui/react";

const ProductImageGallery = ({ product, selectedImage, setSelectedImage }) => {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl">
        <img
          src={product.gallery?.[selectedImage] || product.image}
          alt={product.name}
          className="w-full h-80 md:h-96 lg:h-[400px] object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      </div>
      
      {/* Thumbnail Gallery */}
      {product.gallery && product.gallery.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {product.gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
                selectedImage === index
                  ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                  : 'hover:opacity-75 hover:scale-105'
              }`}
            >
              <img
                src={img}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductInfo = ({ product }) => {
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating) 
            ? "text-yellow-400" 
            : "text-gray-300 dark:text-gray-600"
        }`}
      >
        ★
      </span>
    ));

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Category */}
      <Chip 
        color="default" 
        variant="flat" 
        size="sm"
        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        {product.category}
      </Chip>
      
      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
        {product.name}
      </h1>
      
      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex">{renderStars(product.rating)}</div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {product.rating} ({product.reviews?.length || 0} reviews)
        </span>
      </div>
      
      {/* Price */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-4xl md:text-5xl font-bold text-black dark:text-white">
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
            ${product.originalPrice}
          </span>
        )}
        {discountPercentage > 0 && (
          <Chip 
            color="warning" 
            variant="solid" 
            size="sm"
            className="font-semibold"
          >
            -{discountPercentage}%
          </Chip>
        )}
      </div>
      
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${
          product.inStock ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <span className={`font-medium ${
          product.inStock 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

const ProductActions = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product, quantity } });
  };

  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <Card className="bg-white dark:bg-gray-900 shadow-xl">
      <CardBody className="p-6 space-y-6">
        {product.inStock && (
          <>
            {/* Quantity Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                             disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white
                             font-semibold transition-colors duration-200"
                  >
                    −
                  </button>
                  <input 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-3 py-3 text-center border-0 bg-transparent text-black dark:text-white 
                             font-semibold focus:outline-none"
                    min="1"
                    max="10"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                             disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white
                             font-semibold transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                
                {/* Subtotal */}
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Subtotal:</div>
                  <div className="text-2xl font-bold text-black dark:text-white">${subtotal}</div>
                </div>
              </div>

              {/* Unit Price Info */}
              {quantity > 1 && (
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Unit price: ${product.price}</span>
                  <Chip color="primary" variant="flat" size="sm">
                    ×{quantity}
                  </Chip>
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <Button
            color="warning"
            size="lg"
              className="flex-1 h-28 md:h-14 font-bold text-2xl md:text-base px-8 py-2 md:px-4 md:py-3"
  
            isDisabled={!product.inStock}
            onPress={handleAddToCart}
          >
            {addedToCart ? "✓ Added!" : "Add to Cart"}
            {quantity > 1 && !addedToCart && (
              <Chip color="default" variant="flat" size="sm" className="ml-2">
                ×{quantity}
              </Chip>
            )}
          </Button>
          
          <Button
            color="primary"
            size="lg"
             className="flex-1 h-28 md:h-14 font-bold text-2xl md:text-base px-8 py-2 md:px-4 md:py-3"
  
            isDisabled={!product.inStock}
            onPress={handleBuyNow}
          >
            Buy Now
            {quantity > 1 && (
              <Chip color="default" variant="flat" size="sm" className="ml-2">
                ×{quantity}
              </Chip>
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

const ProductDetailsTabs = ({ product }) => {
  return (
    <Card className="bg-white dark:bg-gray-900 shadow-xl">
      <Tabs aria-label="Product details" variant="underlined" className="w-full">
        <Tab key="description" title="Description">
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {product.description}
            </p>
          </div>
        </Tab>
        
        <Tab key="specifications" title="Specifications">
          <div className="p-6">
            <div className="space-y-4">
              {product.specs?.length > 0 ? (
                product.specs.map((spec, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 
                             rounded-lg border border-gray-200 dark:border-gray-700
                             hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                  >
                    <span className="font-medium text-black dark:text-white">
                      {spec.label}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {spec.value}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No specifications available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6 space-y-8">
    {/* Product Grid */}
    <div className="grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div className="space-y-4">
        <Skeleton className="w-full h-80 md:h-96 lg:h-[400px] rounded-2xl" />
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <Skeleton className="h-16 w-2/3 rounded-lg" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    </div>
    
    {/* Tabs */}
    <Skeleton className="h-80 w-full rounded-2xl" />
  </div>
);

const NotFoundComponent = ({ id, navigate }) => (
  <div className="max-w-2xl mx-auto p-6 mt-20">
    <Card className="bg-white dark:bg-gray-900 shadow-xl">
      <CardBody className="text-center py-16 px-8">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          We couldn't find a product with the ID "{id}". It might have been moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            color="default" 
            variant="bordered"
            onPress={() => navigate(-1)}
          >
            ← Go Back
          </Button>
          <Button 
            color="primary" 
            as={Link} 
            to="/project-VELORA/shop"
          >
            Browse Products
          </Button>
        </div>
      </CardBody>
    </Card>
  </div>
);

// --- Main Product Details Page Component ---
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products?.find((p) => p.id === parseInt(id, 10));

  if (loading) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-white dark:bg-black">
          <LoadingSkeleton />
        </div>
      </DefaultLayout>
    );
  }

  if (!product) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-white dark:bg-black">
          <NotFoundComponent id={id} navigate={navigate} />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            size="lg" 
            className="text-gray-600 dark:text-gray-400"
          >
            <BreadcrumbItem href="/project-VELORA/" className="text-gray-600 dark:text-gray-400">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/project-VELORA/shop" className="text-gray-600 dark:text-gray-400">
              Shop
            </BreadcrumbItem>
            <BreadcrumbItem className="text-black dark:text-white font-medium">
              {product.name}
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductImageGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            
            <div className="space-y-8">
              <ProductInfo product={product} />
              <ProductActions product={product} />
            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductDetailsTabs product={product} />
        </div>
      </div>
    </DefaultLayout>
  );
}