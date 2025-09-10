import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "../contexts/productContext";
import DefaultLayout from "../layouts/default";

// Import all our new components
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfoSection from "../components/ProductInfoSection";
import ProductActions from "../components/ProductActions";
import ProductTabs from "../components/ProductTabs";
import BreadcrumbNavigation from "../components/BreadcrumbNavigation";
import LoadingSkeleton from "../components/LoadingSkeleto";
import AIChatWidget from "../components/AIChatWidget";

const NotFoundComponent = ({ id, navigate }) => (
  <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 mt-8 sm:mt-20">
    <div className="bg-white dark:bg-black rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 
                    shadow-sm overflow-hidden">
      <div className="text-center py-12 sm:py-20 px-4 sm:px-8">
        <div className="text-4xl sm:text-6xl mb-6 sm:mb-8">🔍</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black dark:text-white mb-4 sm:mb-6">
          Product Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 leading-relaxed 
                      text-base sm:text-lg max-w-sm sm:max-w-md mx-auto">
          We couldn't find a product with the ID "{id}". It might have been moved or is no longer available.
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
      comment: "These headphones are absolutely incredible. The noise cancellation is second to none, and the sound quality is pristine. Perfect for long flights and daily commuting.",
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
      comment: "I've tried many premium headphones, and these are by far the best. The battery life is outstanding, and the comfort level is unmatched even during extended use.",
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
      comment: "Really impressed with the audio quality and build. The only minor issue is they can feel a bit heavy during very long sessions, but overall excellent product.",
      date: "2024-01-10",
      verified: true,
      helpful: 12,
    },
  ],
  // Add more product-specific reviews as needed
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
      userId: Date.now(), // In a real app, this would be the logged-in user ID
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

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product?.name || "Product", href: null }
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
          
          {/* Breadcrumbs - Hidden on mobile to save space */}
          <div className="hidden sm:block">
            <BreadcrumbNavigation 
              items={breadcrumbItems}
              className="pt-0 sm:pt-2 lg:pt-4"
            />
          </div>

          {/* Product Grid - Stack on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="w-full">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Info and Actions */}
            <div className="w-full space-y-6 sm:space-y-8 lg:space-y-12">
              <ProductInfoSection 
                product={product} 
                reviews={reviews} 
              />
              <ProductActions product={product} />
            </div>
          </div>

          {/* Product Details Tabs - Full width on all screens */}
          <div className="w-full">
            <ProductTabs
              product={product}
              reviews={reviews}
              onAddReview={handleAddReview}
              onHelpfulReview={handleHelpfulReview}
            />
          </div>
        </div>

        {/* AI Chat Widget - Positioned for mobile and desktop */}
        <AIChatWidget product={product} />
      </div>
    </DefaultLayout>
  );
}