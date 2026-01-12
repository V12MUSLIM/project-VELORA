import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "../contexts/productContext";
import DefaultLayout from "../layouts/default";
import Recommendations from "../components/Recommendtions";
// Import all our new components
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfoSection from "../components/ProductInfoSection";
import ProductActions from "../components/ProductActions";
import BreadcrumbNavigation from "../components/BreadcrumbNavigation";
import LoadingSkeleton from "../components/LoadingSkeleto";
import AIChatWidget from "../components/AIChatWidget";

const NotFoundComponent = ({ id, navigate }) => (
  <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 mt-8 sm:mt-20">
    <div
      className="bg-white dark:bg-black rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 
                    shadow-sm overflow-hidden"
    >
      <div className="text-center py-12 sm:py-20 px-4 sm:px-8">
        <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">🔍</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black dark:text-white mb-4 sm:mb-6">
          Product Not Found
        </h1>
        <p
          className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 leading-relaxed 
                      text-base sm:text-lg max-w-sm sm:max-w-md mx-auto"
        >
          We couldn't find a product with the ID "{id}". It might have been
          moved or is no longer available.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white 
                       px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium 
                       hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 
                       border border-gray-200 dark:border-gray-800 text-sm sm:text-base"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black 
                       px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium 
                       hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200
                       text-sm sm:text-base"
          >
            Browse Products
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Sample reviews data - in a real app, this would come from your backend
const sampleReviewsData = {
  1: [
    {
      id: 1,
      productId: 1,
      userId: 1,
      userName: "Alex Johnson",
      userAvatar: "https://i.pravatar.cc/150?u=alex",
      rating: 5,
      title: "Exceptional noise cancellation!",
      comment:
        "These headphones are absolutely incredible. The noise cancellation is second to none, and the sound quality is pristine. Perfect for long flights and daily commuting.",
      date: "2024-01-15",
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      productId: 1,
      userId: 2,
      userName: "Sarah Chen",
      userAvatar: "https://i.pravatar.cc/150?u=sarah",
      rating: 5,
      title: "Worth every penny",
      comment:
        "I've tried many premium headphones, and these are by far the best. The battery life is outstanding, and the comfort level is unmatched even during extended use.",
      date: "2024-01-12",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      productId: 1,
      userId: 3,
      userName: "Michael Rodriguez",
      userAvatar: "https://i.pravatar.cc/150?u=michael",
      rating: 4,
      title: "Great sound quality",
      comment:
        "Really impressed with the audio quality and build. The only minor issue is they can feel a bit heavy during very long sessions, but overall excellent product.",
      date: "2024-01-10",
      verified: true,
      helpful: 12,
    },
  ],
  // Add more product-specific reviews as needed
};

// Review Card Component
const ReviewCard = ({ review, onHelpful }) => (
  <div className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-b-0">
    <div className="flex items-start gap-4">
      <img
        src={review.userAvatar}
        alt={review.userName}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-medium text-black dark:text-white">
              {review.userName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-700"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {review.verified && (
                <span className="text-xs text-green-600 dark:text-green-400">
                  ✓ Verified Purchase
                </span>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(review.date).toLocaleDateString()}
          </span>
        </div>
        {review.title && (
          <h5 className="font-medium text-black dark:text-white mb-2">
            {review.title}
          </h5>
        )}
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {review.comment}
        </p>
        <button
          onClick={() => onHelpful(review.id)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Helpful ({review.helpful})
        </button>
      </div>
    </div>
  </div>
);

// Review Form Component
const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment && userName) {
      onSubmit({
        id: Date.now(),
        userName,
        userAvatar: `https://i.pravatar.cc/150?u=${userName}`,
        rating,
        title,
        comment,
        date: new Date().toISOString().split("T")[0],
        verified: false,
        helpful: 0,
      });
      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      setUserName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 
                     bg-white dark:bg-gray-900 text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-700"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 
                     bg-white dark:bg-gray-900 text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 
                     bg-white dark:bg-gray-900 text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black 
                   px-8 py-3 rounded-xl font-medium 
                   hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200"
      >
        Submit Review
      </button>
    </form>
  );
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [reviews, setReviews] = useState([]);

  const product = products?.find((p) => p.id === parseInt(id, 10));

  // Load reviews for this product
  useEffect(() => {
    if (product) {
      const productReviews = sampleReviewsData[product.id] || [];
      setReviews(productReviews);
    }
  }, [product]);

  const handleAddReview = (newReview) => {
    const reviewWithProductId = {
      ...newReview,
      productId: product.id,
      userId: Date.now(),
    };
    setReviews((prev) => [reviewWithProductId, ...prev]);
  };

  const handleHelpfulReview = (reviewId) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product?.name || "Product", href: null },
  ];

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
        {/* Mobile-optimized container with proper padding */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Breadcrumbs */}
          <div>
            <BreadcrumbNavigation
              items={breadcrumbItems}
              className="pt-0 sm:pt-2 lg:pt-4"
            />
          </div>

          {/* Product Grid - Stack on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="w-full pt-4 sm:pt-2 lg:pt-0">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Info and Actions */}
            <div className="w-full space-y-6 sm:space-y-8 lg:space-y-12">
              <ProductInfoSection product={product} reviews={reviews} />
              <ProductActions product={product} />
            </div>
          </div>

          {/* Description Section */}
          <div className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white mb-4 sm:mb-6">
              Description
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Specifications Section */}
          {product.specs && product.specs.length > 0 && (
            <div className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white mb-4 sm:mb-6">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800"
                  >
                    <span className="font-medium text-black dark:text-white">
                      {spec.label}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-light text-black dark:text-white mb-2">
                Customer Reviews
              </h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-black dark:text-white mr-2">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < Math.round(averageRating)
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-700"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Based on {reviews.length} review
                    {reviews.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Review List */}
            {reviews.length > 0 ? (
              <div className="space-y-6 mb-8">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onHelpful={handleHelpfulReview}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                No reviews yet. Be the first to review this product!
              </p>
            )}

            {/* Review Form */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <h3 className="text-xl sm:text-2xl font-light text-black dark:text-white mb-6">
                Write a Review
              </h3>
              <ReviewForm onSubmit={handleAddReview} />
            </div>
          </div>
          <div>
            <Recommendations products={products} currentProduct={product} />
          </div>
        </div>

        {/* AI Chat Widget */}
        <AIChatWidget product={product} />
      </div>
    </DefaultLayout>
  );
}
