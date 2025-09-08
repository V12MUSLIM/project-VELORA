import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "../contexts/productContext";
import DefaultLayout from "../layouts/default";
import { useCart } from "../contexts/CartContext"; 
import { ChatTriggerButton } from "./ChatTriggerButton";
import { GeminiChatModal } from "../components/GeminiChatModal";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab,
  Skeleton,
  Avatar,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
  addToast,
} from "@heroui/react";
  const customCloseIcon = (
    <svg
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="32"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );

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
                  ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900"
                  : "hover:opacity-75 hover:scale-105"
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

const ProductInfo = ({ product, reviews }) => {
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
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product.rating || 0;

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
        <div className="flex">{renderStars(averageRating)}</div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {averageRating.toFixed(1)} ({reviews.length} reviews)
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
        <div
          className={`w-3 h-3 rounded-full ${
            product.inStock ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span
          className={`font-medium ${
            product.inStock
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

const ProductActions = ({ product }) => {

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
   addToast({
      hideIcon: true,
      title: "Added to cart!",
      description: `${product.name} • $${product.price} • Quantity: ${product.quantity}`,
      timeout: 3000,
      classNames: {
        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
      },
      closeIcon: customCloseIcon,
    });
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
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
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
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Subtotal:
                  </div>
                  <div className="text-2xl font-bold text-black dark:text-white">
                    ${subtotal}
                  </div>
                </div>
              </div>

              {/* Unit Price Info */}
              {quantity > 1 && (
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">
                    Unit price: ${product.price}
                  </span>
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

const WriteReviewModal = ({ isOpen, onClose, onSubmit, productName }) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: '',
    userName: '',
  });

  const handleSubmit = () => {
    if (reviewData.comment.trim() && reviewData.userName.trim()) {
      onSubmit({
        ...reviewData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        verified: false,
        helpful: 0,
        userAvatar: `https://i.pravatar.cc/150?u=${reviewData.userName.toLowerCase()}`,
      });
      setReviewData({ rating: 5, title: '', comment: '', userName: '' });
      onClose();
    }
  };

  const renderStarSelector = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setReviewData({ ...reviewData, rating: star })}
          className={`text-2xl hover:scale-110 transition-transform ${
            star <= reviewData.rating 
              ? 'text-yellow-400' 
              : 'text-gray-300 dark:text-gray-600'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Write a Review for {productName}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <Input
                placeholder="Enter your name"
                value={reviewData.userName}
                onChange={(e) => setReviewData({ ...reviewData, userName: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              {renderStarSelector()}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Title (Optional)</label>
              <Input
                placeholder="Summarize your review"
                value={reviewData.title}
                onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                placeholder="Share your thoughts about this product..."
                minRows={4}
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            onPress={handleSubmit}
            isDisabled={!reviewData.comment.trim() || !reviewData.userName.trim()}
          >
            Submit Review
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ReviewStats = ({ reviews }) => {
  const totalReviews = reviews.length;
  
  if (totalReviews === 0) {
    return (
      <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

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

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 border-b border-gray-200 dark:border-gray-700">
      {/* Overall Rating */}
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-black dark:text-white">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex justify-center">
          {renderStars(averageRating)}
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Based on {totalReviews} reviews
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((rating, index) => (
          <div key={rating} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
              {rating}★
            </span>
            <Progress
              value={(ratingCounts[index] / totalReviews) * 100}
              className="flex-1"
              color="warning"
              size="sm"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
              {ratingCounts[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review, onHelpful }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
      >
        ★
      </span>
    ));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleHelpful = () => {
    if (!hasVoted) {
      onHelpful(review.id);
      setHasVoted(true);
    }
  };

  return (
    <div className="p-6 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className="flex gap-4">
        {/* Avatar */}
        <Avatar
          src={review.userAvatar}
          name={review.userName}
          size="md"
          className="flex-shrink-0"
        />
        
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  {review.userName}
                </h4>
                {review.verified && (
                  <Chip
                    color="success"
                    variant="flat"
                    size="sm"
                    className="text-xs"
                  >
                    Verified Purchase
                  </Chip>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            {review.title && (
              <h5 className="font-medium text-black dark:text-white">
                {review.title}
              </h5>
            )}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {review.comment}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={handleHelpful}
              disabled={hasVoted}
              className={`flex items-center gap-1 text-sm transition-colors ${
                hasVoted 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary'
              }`}
            >
              <span>{hasVoted ? '✓' : '👍'}</span>
              <span>Helpful ({review.helpful})</span>
            </button>
            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductReviews = ({ product, reviews, onAddReview, onHelpfulReview }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayCount, setDisplayCount] = useState(5);

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMoreReviews = reviews.length > displayCount;

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <ReviewStats reviews={reviews} />

      {/* Write Review Button */}
      <div className="px-6">
        <Button
          color="primary"
          variant="bordered"
          size="lg"
          className="w-full md:w-auto"
          onPress={onOpen}
        >
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-0">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              onHelpful={onHelpfulReview}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Be the first to share your thoughts about this product.
            </p>
            <Button color="primary" onPress={onOpen}>
              Write the First Review
            </Button>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMoreReviews && (
        <div className="text-center px-6 pb-6">
          <Button
            variant="flat"
            color="default"
            size="lg"
            onPress={() => setDisplayCount(prev => prev + 5)}
          >
            Load More Reviews ({reviews.length - displayCount} remaining)
          </Button>
        </div>
      )}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onAddReview}
        productName={product.name}
      />
    </div>
  );
};

const ProductDetailsTabs = ({ product, reviews, onAddReview, onHelpfulReview }) => {
  return (
    <Card className="bg-white dark:bg-gray-900 shadow-xl">
      <Tabs
        aria-label="Product details"
        variant="underlined"
        className="w-full"
      >
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

        <Tab key="reviews" title={`Reviews (${reviews.length})`}>
          <ProductReviews
            product={product}
            reviews={reviews}
            onAddReview={onAddReview}
            onHelpfulReview={onHelpfulReview}
          />
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
          We couldn't find a product with the ID "{id}". It might have been
          moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            color="default"
            variant="bordered"
            onPress={() => navigate(-1)}
          >
            ← Go Back
          </Button>
          <Button color="primary" as={Link} to="/shop">
            Browse Products
          </Button>
        </div>
      </CardBody>
    </Card>
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
      helpful: 24
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
      helpful: 18
    }
  ],
  // Add more product-specific reviews as needed
};

// --- Main Product Details Page Component ---
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { 
   isOpen: isChatOpen, 
   onOpen: onChatOpen, 
  onClose: onChatClose 
  } = useDisclosure();
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
    setReviews(prev => [reviewWithProductId, ...prev]);
  };

  const handleHelpfulReview = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

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
      <ChatTriggerButton onPress={onChatOpen} />
     <GeminiChatModal 
      isOpen={isChatOpen} 
     onClose={onChatClose} 
      product={product}
      reviews={reviews}
 />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs size="lg" className="text-gray-600 dark:text-gray-400">
            <BreadcrumbItem
              href="/"
              className="text-gray-600 dark:text-gray-400"
            >
              Home
            </BreadcrumbItem>
            <BreadcrumbItem
              href="/shop"
              className="text-gray-600 dark:text-gray-400"
            >
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
              <ProductInfo product={product} reviews={reviews} />
              <ProductActions product={product} />
            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductDetailsTabs 
            product={product} 
            reviews={reviews}
            onAddReview={handleAddReview}
            onHelpfulReview={handleHelpfulReview}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}