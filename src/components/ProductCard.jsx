import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Update path as needed
import { addToast } from "@heroui/react";
export default function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    rating,
    reviews,
    inStock,
    isFavorited = false,
  } = product;

  const [favorited, setFavorited] = useState(isFavorited);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const savings = originalPrice ? (originalPrice - price).toFixed(2) : null;
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

  // Fixed handler - no event parameter needed for HeroUI onPress
  const handleAddToCart = () => {
    if (!inStock) return;

    addToCart(product, 1);
    setAddedToCart(true);

    // Show success toast with custom styling
    addToast({
      hideIcon: true,
      title: "Added to cart!",
      description: `${name} • $${price} • Quantity: 1`,
      timeout: 3000,
      classNames: {
        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
      },
      closeIcon: customCloseIcon,
    });

    // Reset the button text after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <Card className="w-full hover:scale-[1.02] transition-transform duration-300 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800">
      {/* Link wraps only the clickable content (image and product info) */}
      <Link
        to={`/shop/product/${id}`}
        className="block group"
        aria-label={`View details for ${name}`}
      >
        {/* Image Section */}
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-900">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover",
              }}
            />

            {/* Favorite Button */}
            <Button
              isIconOnly
              variant="flat"
              className="absolute top-3 right-3 z-10 bg-white/95 dark:bg-black/95 hover:bg-white dark:hover:bg-black border border-gray-200 dark:border-zinc-700 backdrop-blur-sm shadow-lg"
              onPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFavorited(!favorited);
                console.log("Favorite clicked", !favorited);
              }}
              aria-label={
                favorited ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`w-4 h-4 text-red-500 dark:text-red-400 transition-colors ${
                  favorited ? "fill-current" : "fill-none"
                }`}
              />
            </Button>

            {/* Out of Stock Overlay */}
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center">
                <Chip
                  variant="solid"
                  className="bg-white dark:bg-black text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-zinc-700"
                >
                  Out of Stock
                </Chip>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardBody className="px-4 py-4 space-y-3">
          {/* Category & Rating Row */}
          <div className="flex items-start justify-between">
            <Chip
              variant="solid"
              className="bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-medium uppercase tracking-wide"
              size="sm"
            >
              {category}
            </Chip>

            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-zinc-400 ml-1">
                ({reviews || 0})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <div className="min-h-[2.5rem]">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
              {name}
            </h3>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-black dark:text-white">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 dark:text-zinc-400 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>

            {savings && (
              <Chip
                variant="flat"
                className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900"
                size="sm"
              >
                Save ${savings}
              </Chip>
            )}
          </div>
        </CardBody>
      </Link>

      {/* Add to Cart Button - Outside the link */}
      <div className="px-4 pb-4">
        <Button
          className={`w-full font-medium transition-all duration-300 ${
            inStock
              ? addedToCart
                ? "bg-green-500 text-white"
                : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-zinc-100 data-[pressed=true]:bg-gray-700 dark:data-[pressed=true]:bg-zinc-200"
              : "bg-gray-100 dark:bg-zinc-900 text-gray-400 dark:text-zinc-500"
          }`}
          variant={inStock ? "solid" : "flat"}
          isDisabled={!inStock}
          onPress={handleAddToCart}
        >
          {addedToCart
            ? "✓ Added to Cart!"
            : inStock
              ? "Add to Cart"
              : "Out of Stock"}
        </Button>
      </div>
    </Card>
  );
}
