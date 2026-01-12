import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
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
    discountPercent,
  } = product;

  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const favorited = isInWishlist(id);
  const savings = originalPrice ? (originalPrice - price).toFixed(2) : null;

  const handleToggleWishlist = () => {
    toggleWishlist(product);

    addToast({
      hideIcon: true,
      title: favorited ? "Removed from wishlist" : "Added to wishlist",
      description: name,
      timeout: 2000,
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!inStock) return;

    addToCart(product, 1);
    setAddedToCart(true);

    addToast({
      hideIcon: true,
      title: "Added to cart",
      description: `${name} • $${price}`,
      timeout: 3000,
    });

    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Card className="w-full hover:scale-[1.02] transition-transform duration-300 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 relative">

      {/* ❤️ زر القلب (برا الـ Link) */}
      <Button
        isIconOnly
        variant="flat"
        onPress={handleToggleWishlist}
        className="absolute top-3 right-3 z-20 bg-white/95 dark:bg-black/95 border border-gray-200 dark:border-zinc-700 backdrop-blur-sm shadow-lg"
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            favorited
              ? "fill-red-500 text-red-500 scale-110"
              : "text-red-500"
          }`}
        />
      </Button>

      
      <Link to={`/shop/product/${id}`} className="block group">
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-900">
            {discountPercent > 0 && (
              <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                -{discountPercent}%
              </div>
            )}

            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardBody className="px-4 py-4 space-y-3">
          <div className="flex items-start justify-between">
            <Chip size="sm">{category}</Chip>

            <div className="flex items-center gap-1">
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
              <span className="text-xs text-gray-500 ml-1">
                ({reviews || 0})
              </span>
            </div>
          </div>

          <h3 className="font-medium text-sm line-clamp-2">{name}</h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">${price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          {savings && (
            <Chip size="sm" variant="flat">
              Save ${savings}
            </Chip>
          )}
        </CardBody>
      </Link>

      {/* Add to Cart Button - Outside the link */}
      <div className="px-4 pb-4">
        <Button
          className={`w-full font-medium transition-all duration-300 ${inStock
              ? addedToCart
                ? "bg-green-500 text-white"
                : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-zinc-100 data-[pressed=true]:bg-gray-700 dark:data-[pressed=true]:bg-zinc-200"
              : "dark:bg-gray-100 bg-black text-gray-400 dark:text-zinc-500"
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
