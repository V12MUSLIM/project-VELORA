import StarRating from './StarRating';

const ProductInfoSection = ({ product, reviews = [], className = "" }) => {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : product.rating || 0;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Badge */}
      <div className="inline-block">
        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 
                        rounded-full text-sm font-medium border border-gray-200 dark:border-gray-800">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black dark:text-white 
                     leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <StarRating 
        rating={averageRating} 
        reviewCount={reviews.length}
        size="lg"
      />

      {/* Price Section */}
      <div className="flex items-end gap-4 flex-wrap">
        <span className="text-5xl md:text-6xl font-light text-black dark:text-white">
          ${product.price}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-2xl text-gray-500 dark:text-gray-500 line-through font-light">
              ${product.originalPrice}
            </span>
            {discountPercentage > 0 && (
              <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 
                             rounded-full text-sm font-medium">
                -{discountPercentage}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          product.inStock ? "bg-green-500" : "bg-red-500"
        }`} />
        <span className={`font-medium ${
          product.inStock
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Description Preview */}
      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfoSection;