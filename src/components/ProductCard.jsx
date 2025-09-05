import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

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
    badge,
  } = product;

  return (
    <Link
      to={`/project-VELORA/shop/product/${id}`}
      className="block h-full"
      aria-label={`View details for ${name}`}
    >
      <Card
        className={
          "h-full group relative cursor-pointer bg-background/60 dark:bg-white/5 backdrop-blur-xl " +
          "border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 " +
          "hover:bg-background/80 dark:hover:bg-white/10 transition-all duration-500 " +
          "hover:shadow-xl hover:shadow-black/5 overflow-hidden"
        }
      >
        {/* -------- Image Section -------- */}
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              classNames={{
                wrapper: "w-full h-full !max-w-full",
                img: "w-full h-full object-cover",
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Badge */}
            {badge && (
              <Chip
                className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-background/70 dark:bg-white/20 backdrop-blur-md border-black/10 dark:border-white/30 text-foreground dark:text-white shadow-lg text-xs lg:text-sm"
                size="sm"
                variant="flat"
              >
                {badge}
              </Chip>
            )}

            {/* Favorite Button */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Favorite clicked");
              }}
              role="button"
              tabIndex={0}
              className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-background/70 hover:bg-background/90 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-black/10 hover:border-black/20 dark:border-white/20 dark:hover:border-white/30 transition-all duration-300 transform hover:scale-110 w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center cursor-pointer z-10"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Favorite clicked (keyboard)");
                }
              }}
            >
              <Heart size={14} className="text-foreground dark:text-white" />
            </div>

            {/* Out of Stock Overlay */}
            {!inStock && (
              <div className="absolute inset-0 bg-background/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <Chip
                  className="bg-background/70 dark:bg-white/10 backdrop-blur-md border-black/10 dark:border-white/20 text-foreground dark:text-white shadow-xl"
                  variant="bordered"
                >
                  Out of Stock
                </Chip>
              </div>
            )}
          </div>
        </CardHeader>

        {/* -------- Body Section -------- */}
        <CardBody className="p-3 lg:p-6">
          {/* Category + Rating */}
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <Chip
              className="bg-background/70 dark:bg-white/5 backdrop-blur-sm text-foreground/60 dark:text-white/60 border-black/5 dark:border-white/10 text-xs lg:text-sm"
              size="sm"
              variant="bordered"
            >
              {category && category.toUpperCase()}
            </Chip>

            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      "text-xs lg:text-sm " +
                      (i < Math.floor(rating || 0)
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-black/20 dark:text-white/20")
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-foreground/40 dark:text-white/40">
                ({reviews || 0})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-foreground dark:text-white mb-2 lg:mb-4 line-clamp-2 leading-tight text-sm lg:text-lg">
            {name}
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline justify-between mb-3 lg:mb-6 p-2 lg:p-3 bg-background/60 dark:bg-white/5 backdrop-blur-sm rounded-lg lg:rounded-xl border border-black/5 dark:border-white/10">
            <div className="flex flex-col space-y-1">
              <div className="flex items-baseline space-x-2 lg:space-x-3">
                <span className="text-lg lg:text-2xl font-bold text-foreground dark:text-white">
                  ${price}
                </span>
                {originalPrice != null && (
                  <span className="text-xs lg:text-sm text-foreground/50 dark:text-white/50 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {originalPrice != null && (
                <Chip
                  className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-[10px] lg:text-xs w-fit"
                  size="sm"
                  variant="bordered"
                >
                  Save ${(originalPrice - price).toFixed(2)}
                </Chip>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className={
              "w-full font-medium transition-all duration-300 h-9 lg:h-11 " +
              (inStock
                ? "bg-background/70 hover:bg-background/90 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border-black/10 hover:border-black/20 dark:border-white/20 dark:hover:border-white/30 text-foreground dark:text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                : "bg-background/50 dark:bg-white/5 border-black/5 dark:border-white/10 text-foreground/40 dark:text-white/40")
            }
            variant="bordered"
            size="lg"
            isDisabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Add to cart clicked");
            }}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardBody>
      </Card>
    </Link>
  );
}
