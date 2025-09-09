import { useState } from "react";
import StarRating from "./StarRating";

const ReviewCard = ({ review, onHelpful, className = "" }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleHelpful = () => {
    if (!hasVoted) {
      onHelpful(review.id);
      setHasVoted(true);
    }
  };

  return (
    <div className={`p-8 border-b border-gray-100 dark:border-gray-900 last:border-b-0 ${className}`}>
      <div className="flex gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-12 h-12 rounded-full object-cover bg-gray-100 dark:bg-gray-900"
          />
        </div>

        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-black dark:text-white text-lg">
                  {review.userName}
                </h4>
                {review.verified && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 
                                  px-2 py-1 rounded-full text-xs font-medium">
                    Verified Purchase
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <StarRating rating={review.rating} showRating={false} size="sm" />
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-3">
            {review.title && (
              <h5 className="font-medium text-black dark:text-white text-lg">
                {review.title}
              </h5>
            )}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {review.comment}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 pt-2">
            <button
              onClick={handleHelpful}
              disabled={hasVoted}
              className={`flex items-center gap-2 text-sm transition-colors ${
                hasVoted
                  ? "text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>Helpful ({review.helpful})</span>
            </button>
            
            <button className="text-sm text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;