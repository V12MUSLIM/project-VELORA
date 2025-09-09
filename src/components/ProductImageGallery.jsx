import { useState } from "react";

const ProductImageGallery = ({ product, className = "" }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={`w-full space-y-4 sm:space-y-6 ${className}`}>
      {/* Main Image Container */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-50 dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="aspect-square sm:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] w-full">
          <img
            src={product.gallery?.[selectedImage] || product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/2 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {product.gallery && product.gallery.length > 1 && (
        <div className="w-full">
          {/* Mobile: Horizontal scroll */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 px-1">
            {product.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-xl transition-all duration-300 ${
                  selectedImage === index
                    ? "ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-black scale-105"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
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

          {/* Desktop: Grid layout */}
          <div className="hidden sm:grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {product.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 ${
                  selectedImage === index
                    ? "ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-black scale-105"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
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
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;