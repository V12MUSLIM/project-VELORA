const StarRating = ({ rating, size = "base", showRating = true, reviewCount = null, className = "" }) => {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-xl",
    xl: "text-2xl"
  };

  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`${sizeClasses[size]} ${
          i < Math.floor(rating)
            ? "text-black dark:text-white"
            : "text-gray-300 dark:text-gray-700"
        } transition-colors duration-200`}
      >
        ★
      </span>
    ));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">{renderStars()}</div>
      {showRating && (
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {rating.toFixed(1)}
          {reviewCount !== null && (
            <span className="ml-1">({reviewCount} review{reviewCount !== 1 ? 's' : ''})</span>
          )}
        </span>
      )}
    </div>
  );
};

export default StarRating;