import { useState } from "react";
import ReviewStats from "./ReviewStats";
import ReviewCard from "./ReviewCard";

const ProductTabs = ({ product, reviews, onAddReview, onHelpfulReview, className = "" }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [displayCount, setDisplayCount] = useState(5);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${reviews.length})` }
  ];

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMoreReviews = reviews.length > displayCount;

  const WriteReviewButton = ({ onOpen }) => (
    <button
      onClick={onOpen}
      className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 
                 rounded-2xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200
                 transition-all duration-200 hover:scale-[0.98]"
    >
      Write a Review
    </button>
  );

  return (
    <div className={`bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 
                     shadow-sm overflow-hidden ${className}`}>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-8 py-6 text-center font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "text-black dark:text-white border-b-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900"
                : "text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="p-12">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
                About this product
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
              
              {/* Key Features */}
              {product.features && (
                <div className="mt-12">
                  <h3 className="text-xl font-medium text-black dark:text-white mb-6">
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 
                                                  rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="p-12">
            <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
              Technical Specifications
            </h2>
            
            {product.specs?.length > 0 ? (
              <div className="space-y-4 max-w-4xl">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 
                                             rounded-2xl border border-gray-100 dark:border-gray-800">
                    <span className="font-medium text-black dark:text-white text-lg">
                      {spec.label}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-lg">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-6">📋</div>
                <p className="text-gray-500 dark:text-gray-500 text-lg">
                  Detailed specifications will be available soon.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            {/* Review Stats */}
            <ReviewStats reviews={reviews} />

            {/* Write Review Button */}
            <div className="px-12 py-8">
              <WriteReviewButton onOpen={() => {/* Handle modal open */}} />
            </div>

            {/* Reviews List */}
            <div>
              {displayedReviews.length > 0 ? (
                displayedReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onHelpful={onHelpfulReview}
                  />
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">💬</div>
                  <h3 className="text-2xl font-medium text-black dark:text-white mb-4">
                    No reviews yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 text-lg mb-8">
                    Be the first to share your thoughts about this product.
                  </p>
                  <WriteReviewButton onOpen={() => {/* Handle modal open */}} />
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMoreReviews && (
              <div className="text-center p-12">
                <button
                  onClick={() => setDisplayCount((prev) => prev + 5)}
                  className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-8 py-4 
                           rounded-2xl font-medium hover:bg-gray-200 dark:hover:bg-gray-800
                           transition-all duration-200 border border-gray-200 dark:border-gray-800"
                >
                  Load More Reviews ({reviews.length - displayCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;