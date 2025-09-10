import StarRating from "./StarRating";

const ReviewStats = ({ reviews, className = "" }) => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return (
      <div className={`text-center p-12 border-b border-gray-100 dark:border-gray-900 ${className}`}>
        <div className="text-4xl mb-4">⭐</div>
        <p className="text-gray-500 dark:text-gray-500">No reviews yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">
          Be the first to share your thoughts
        </p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((review) => review.rating === rating).length
  );

  return (
    <div className={`grid md:grid-cols-2 gap-12 p-12 border-b border-gray-100 dark:border-gray-900 ${className}`}>
      {/* Overall Rating */}
      <div className="text-center space-y-6">
        <div className="text-7xl font-light text-black dark:text-white">
          {averageRating.toFixed(1)}
        </div>
        <StarRating rating={averageRating} showRating={false} size="xl" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-4">
        <h3 className="font-medium text-black dark:text-white text-lg mb-6">Rating Distribution</h3>
        {[5, 4, 3, 2, 1].map((rating, index) => (
          <div key={rating} className="flex items-center gap-4">
            <span className="text-sm font-medium text-black dark:text-white w-8">
              {rating}★
            </span>
            
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-black dark:bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${(ratingCounts[index] / totalReviews) * 100}%` }}
              />
            </div>
            
            <span className="text-sm text-gray-500 dark:text-gray-500 w-8 text-right">
              {ratingCounts[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewStats;