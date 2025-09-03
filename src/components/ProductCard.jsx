import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Heart } from "lucide-react";

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
    description,
    inStock,
    badge,
  } = product;

  return (
    <Card className="group relative bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/25">
      {/* Card Header with Image */}
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

          {/* Glass overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Badge with glassmorphism */}
          {badge && (
            <Chip
              className="absolute top-3 left-3 bg-white/20 backdrop-blur-md border-white/30 text-white shadow-lg"
              size="sm"
              variant="flat"
            >
              {badge}
            </Chip>
          )}

          {/* Favorite button - Now a div with onClick */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add your favorite logic here
              console.log("Favorite clicked");
            }}
            className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur-md 
              border border-white/20 hover:border-white/30 transition-all duration-300 
              transform hover:scale-110 w-8 h-8 rounded-lg flex items-center justify-center 
              cursor-pointer z-10"
          >
            <Heart size={14} className="text-white" />
          </div>

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Chip
                className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl"
                variant="bordered"
              >
                Out of Stock
              </Chip>
            </div>
          )}
        </div>
      </CardHeader>

      {/* Card Body with Content */}
      <CardBody className="p-6 relative">
        {/* Glass separator */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-4 pt-2">
          <Chip
            className="bg-white/5 backdrop-blur-sm text-white/60 border-white/10"
            size="sm"
            variant="bordered"
          >
            {category.toUpperCase()}
          </Chip>

          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-white/20"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-white/40">({reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-white mb-4 line-clamp-2 leading-tight text-lg">
          {name}
        </h3>

        {/* Price Section with glassmorphism */}
        <div className="flex items-baseline justify-between mb-6 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex flex-col space-y-1">
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-bold text-white">${price}</span>
              {originalPrice && (
                <span className="text-sm text-white/50 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            {originalPrice && (
              <Chip
                className="bg-green-400/10 text-green-400 border-green-400/20 text-xs w-fit"
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
          className={`w-full font-medium transition-all duration-300 ${
            inStock
              ? "bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 hover:border-white/30 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              : "bg-white/5 border-white/10 text-white/40"
          }`}
          variant="bordered"
          size="lg"
          isDisabled={!inStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add your cart logic here
            console.log("Add to cart clicked");
          }}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardBody>

      {/* Glass shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-large">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-large"></div>
      </div>
    </Card>
  );
}
