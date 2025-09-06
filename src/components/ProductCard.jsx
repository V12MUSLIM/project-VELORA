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
    <>
      <style>{`
        /* Base styles for mobile-first approach (iPhone 4: 320px) */
        .product-card {
          height: 100%;
          width: 100%;
          position: relative;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          transition: all 0.5s ease;
          overflow: hidden;
          display: block;
          text-decoration: none;
          color: inherit;
        }
        
        .product-card:hover {
          border-color: rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .product-card-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .product-image-section {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          padding: 0;
        }
        
        .product-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        
        .favorite-button {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(244, 63, 94, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(244, 63, 94, 0.2);
          border-radius: 8px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }
        
        .favorite-button:hover {
          background: rgba(244, 63, 94, 0.2);
          border-color: rgba(244, 63, 94, 0.3);
          transform: scale(1.1);
        }
        
        .favorite-icon {
          width: 14px;
          height: 14px;
          color: rgba(244, 63, 94, 0.7);
          transition: color 0.3s ease;
        }
        
        .favorite-button:hover .favorite-icon {
          color: rgb(244, 63, 94);
        }
        
        .product-body {
          padding: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .category-rating-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .category-chip {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(4px);
          color: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
        }
        
        .rating-section {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .stars {
          display: flex;
        }
        
        .star {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.2);
        }
        
        .star.filled {
          color: rgb(234, 179, 8);
        }
        
        .reviews-count {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.4);
        }
        
        .product-title {
          font-weight: 600;
          color: rgb(0, 0, 0);
          margin-bottom: 8px;
          line-height: 1.2;
          font-size: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .price-section {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(4px);
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          padding: 8px;
          margin-bottom: 12px;
        }
        
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }
        
        .current-price {
          font-size: 16px;
          font-weight: 700;
          color: rgb(0, 0, 0);
        }
        
        .original-price {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.5);
          text-decoration: line-through;
        }
        
        .savings-chip {
          background: rgba(34, 197, 94, 0.1);
          color: rgb(22, 163, 74);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 9px;
          font-weight: 500;
          width: fit-content;
        }
        
        .add-to-cart-btn {
          width: 100%;
          font-weight: 500;
          transition: all 0.3s ease;
          height: 36px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          color: rgb(0, 0, 0);
          cursor: pointer;
          font-size: 12px;
          margin-top: auto;
        }
        
        .add-to-cart-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 0, 0, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: scale(1.02);
        }
        
        .add-to-cart-btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        
        .add-to-cart-btn:disabled {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(0, 0, 0, 0.05);
          color: rgba(0, 0, 0, 0.4);
          cursor: not-allowed;
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .product-card {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .product-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
          }
          
          .category-chip {
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .star {
            color: rgba(255, 255, 255, 0.2);
          }
          
          .star.filled {
            color: rgb(251, 191, 36);
          }
          
          .reviews-count {
            color: rgba(255, 255, 255, 0.4);
          }
          
          .product-title {
            color: rgb(255, 255, 255);
          }
          
          .price-section {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .current-price {
            color: rgb(255, 255, 255);
          }
          
          .original-price {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .savings-chip {
            background: rgba(34, 197, 94, 0.1);
            color: rgb(74, 222, 128);
          }
          
          .add-to-cart-btn {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            color: rgb(255, 255, 255);
          }
          
          .add-to-cart-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
          }
          
          .add-to-cart-btn:disabled {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.4);
          }
        }
        
        /* Small devices (iPhone 4-5): 320px - 374px */
        @media (min-width: 320px) {
          .product-body {
            padding: 12px;
          }
          
          .category-chip {
            font-size: 9px;
            padding: 3px 6px;
          }
          
          .product-title {
            font-size: 11px;
            margin-bottom: 6px;
          }
          
          .current-price {
            font-size: 14px;
          }
          
          .add-to-cart-btn {
            height: 32px;
            font-size: 11px;
          }
        }
        
        /* iPhone 6-8: 375px - 413px */
        @media (min-width: 375px) {
          .favorite-button {
            width: 30px;
            height: 30px;
          }
          
          .product-body {
            padding: 14px;
          }
          
          .category-chip {
            font-size: 10px;
            padding: 4px 8px;
          }
          
          .product-title {
            font-size: 12px;
            margin-bottom: 8px;
          }
          
          .current-price {
            font-size: 16px;
          }
          
          .add-to-cart-btn {
            height: 36px;
            font-size: 12px;
          }
        }
        
        /* iPhone Plus/Max and small tablets: 414px - 767px */
        @media (min-width: 414px) {
          .favorite-button {
            top: 10px;
            right: 10px;
            width: 32px;
            height: 32px;
          }
          
          .product-body {
            padding: 16px;
          }
          
          .category-rating-row {
            margin-bottom: 10px;
          }
          
          .category-chip {
            font-size: 11px;
          }
          
          .star {
            font-size: 12px;
          }
          
          .reviews-count {
            font-size: 11px;
          }
          
          .product-title {
            font-size: 14px;
            margin-bottom: 10px;
          }
          
          .price-section {
            padding: 10px;
            margin-bottom: 14px;
          }
          
          .current-price {
            font-size: 18px;
          }
          
          .original-price {
            font-size: 12px;
          }
          
          .add-to-cart-btn {
            height: 40px;
            font-size: 13px;
          }
        }
        
        /* Tablets: 768px - 1023px */
        @media (min-width: 768px) {
          .favorite-button {
            top: 12px;
            right: 12px;
            width: 34px;
            height: 34px;
          }
          
          .favorite-icon {
            width: 16px;
            height: 16px;
          }
          
          .product-body {
            padding: 20px;
          }
          
          .category-rating-row {
            margin-bottom: 12px;
          }
          
          .category-chip {
            font-size: 12px;
            padding: 6px 10px;
          }
          
          .star {
            font-size: 14px;
          }
          
          .reviews-count {
            font-size: 12px;
          }
          
          .product-title {
            font-size: 16px;
            margin-bottom: 12px;
          }
          
          .price-section {
            padding: 12px;
            margin-bottom: 16px;
            border-radius: 10px;
          }
          
          .current-price {
            font-size: 20px;
          }
          
          .original-price {
            font-size: 13px;
          }
          
          .savings-chip {
            font-size: 10px;
            padding: 3px 8px;
          }
          
          .add-to-cart-btn {
            height: 44px;
            font-size: 14px;
          }
        }
        
        /* Desktop: 1024px and up */
        @media (min-width: 1024px) {
          .product-card {
            border-radius: 16px;
          }
          
          .favorite-button {
            top: 16px;
            right: 16px;
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }
          
          .product-body {
            padding: 24px;
          }
          
          .category-rating-row {
            margin-bottom: 16px;
          }
          
          .category-chip {
            font-size: 14px;
            padding: 6px 12px;
            border-radius: 8px;
          }
          
          .star {
            font-size: 16px;
          }
          
          .reviews-count {
            font-size: 14px;
          }
          
          .product-title {
            font-size: 18px;
            margin-bottom: 16px;
          }
          
          .price-section {
            padding: 16px;
            margin-bottom: 20px;
            border-radius: 12px;
          }
          
          .current-price {
            font-size: 24px;
          }
          
          .original-price {
            font-size: 14px;
          }
          
          .savings-chip {
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 6px;
          }
          
          .add-to-cart-btn {
            height: 48px;
            font-size: 16px;
            border-radius: 10px;
          }
        }
      `}</style>
      
      <Link
        to={`/project-VELORA/shop/product/${id}`}
        className="product-card"
        aria-label={`View details for ${name}`}
      >
        <div className="product-card-inner">
          {/* Image Section */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img
                src={image}
                alt={name}
                className="product-image"
              />
              
              {/* Favorite Button */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Favorite clicked");
                }}
                role="button"
                tabIndex={0}
                className="favorite-button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Favorite clicked (keyboard)");
                  }
                }}
              >
                <Heart className="favorite-icon" />
              </div>
            </div>
          </div>

          {/* Body Section */}
          <div className="product-body">
            {/* Category + Rating */}
            <div className="category-rating-row">
              <div className="category-chip">
                {category && category.toUpperCase()}
              </div>

              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < Math.floor(rating || 0) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="reviews-count">
                  ({reviews || 0})
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h3 className="product-title">
              {name}
            </h3>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-row">
                <span className="current-price">
                  ${price}
                </span>
                {originalPrice != null && (
                  <span className="original-price">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {originalPrice != null && (
                <div className="savings-chip">
                  Save ${(originalPrice - price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              disabled={!inStock}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Add to cart clicked");
              }}
            >
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}