import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import {
  Trash2,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Sparkles,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { addToast } from "@heroui/react";
import DefaultLayout from "../layouts/default";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist, moveToCart } =
    useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  const handleGoToShop = () => navigate("/shop");

  const handleMoveToCart = (item) => {
    moveToCart(item.id, addToCart);

    addToast({
      hideIcon: true,
      title: "Added to cart!",
      description: `${item.name} • $${item.price}`,
      timeout: 2000,
      closeIcon: customCloseIcon,
    });
  };

  const handleRemove = (item) => {
    removeFromWishlist(item.id);

    addToast({
      hideIcon: true,
      title: "Removed from wishlist",
      description: item.name,
      timeout: 2000,
      closeIcon: customCloseIcon,
    });
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => addToCart(item));
    clearWishlist();

    addToast({
      hideIcon: true,
      title: "All items added to cart!",
      description: `${wishlistItems.length} items moved to cart`,
      timeout: 2000,
      closeIcon: customCloseIcon,
    });
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        {/* Header */}
        <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Wishlist
                  </h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  {wishlistItems.length} items saved for later
                </p>
              </div>

              <div className="flex gap-3">
                {wishlistItems.length > 0 && (
                  <Button
                    variant="flat"
                    className="bg-gray-100 dark:bg-zinc-900
                               text-gray-700 dark:text-gray-300
                               hover:bg-gray-200 dark:hover:bg-zinc-800
                               border border-gray-200 dark:border-zinc-700"
                    onPress={clearWishlist}
                  >
                    Clear All
                  </Button>
                )}

                <Button
                  variant="flat"
                  className="bg-gray-100 dark:bg-zinc-900
                             text-gray-900 dark:text-white
                             hover:bg-gray-200 dark:hover:bg-zinc-800
                             border border-gray-200 dark:border-zinc-700"
                  startContent={<ArrowLeft size={16} />}
                  onPress={handleGoToShop}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-24 h-24 mx-auto text-gray-300 dark:text-zinc-700" />
              <h2 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-white">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 dark:text-zinc-400 mt-2">
                Save your favorite products here
              </p>
              <Button
                className="mt-6 bg-black dark:bg-white
                           text-white dark:text-black
                           hover:bg-gray-800 dark:hover:bg-zinc-100"
                onPress={handleGoToShop}
              >
                Discover Products
              </Button>
            </div>
          ) : (
            <>
              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlistItems.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-white dark:bg-black
                               border border-gray-200 dark:border-zinc-800
                               hover:border-gray-300 dark:hover:border-zinc-700"
                  >
                    <CardBody className="p-5">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <Chip
                            size="sm"
                            className="mb-2 bg-gray-900 dark:bg-white
                                       text-white dark:text-black uppercase"
                          >
                            {item.category}
                          </Chip>

                          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                            {item.name}
                          </h3>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-bold text-black dark:text-white">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm line-through text-gray-500 dark:text-zinc-400">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              className="flex-1 bg-black dark:bg-white
                                         text-white dark:text-black
                                         hover:bg-gray-800 dark:hover:bg-zinc-100"
                              startContent={<ShoppingCart size={16} />}
                              onPress={() => handleMoveToCart(item)}
                            >
                              Add to Cart
                            </Button>

                            <Button
                              isIconOnly
                              variant="light"
                              className="text-gray-400 hover:text-red-500"
                              onPress={() => handleRemove(item)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="mt-10 text-center">
                <Button
                  className="bg-black dark:bg-white
                             text-white dark:text-black
                             hover:bg-gray-800 dark:hover:bg-zinc-100"
                  onPress={handleMoveAllToCart}
                >
                  Add All to Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
