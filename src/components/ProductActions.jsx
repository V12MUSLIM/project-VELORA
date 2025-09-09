import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import QuantitySelector from "./QuantitySelector";

const ProductActions = ({ product, className = "" }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product, quantity } });
  };

  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <div className={`bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 
                     shadow-sm p-8 space-y-8 ${className}`}>
      
      {product.inStock && (
        <>
          {/* Quantity and Subtotal */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Quantity</p>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">Total</p>
              <p className="text-3xl font-light text-black dark:text-white">
                ${subtotal}
              </p>
              {quantity > 1 && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  ${product.price} each
                </p>
              )}
            </div>
          </div>

          {/* Unit Price Info */}
          {quantity > 1 && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {quantity} × ${product.price}
                </span>
                <span className="font-medium text-black dark:text-white">
                  ${subtotal}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="w-full h-14 bg-black dark:bg-white text-white dark:text-black 
                     rounded-2xl font-medium text-base hover:bg-gray-800 dark:hover:bg-gray-100
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200 hover:scale-[0.98] active:scale-[0.96]
                     flex items-center justify-center gap-2"
        >
          {product.inStock ? "Buy Now" : "Out of Stock"}
          {quantity > 1 && product.inStock && (
            <span className="bg-white/20 dark:bg-black/20 px-2 py-1 rounded-lg text-xs">
              ×{quantity}
            </span>
          )}
        </button>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full h-14 bg-gray-100 dark:bg-gray-900 text-black dark:text-white 
                     rounded-2xl font-medium text-base hover:bg-gray-200 dark:hover:bg-gray-800
                     disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-800
                     transition-all duration-200 hover:scale-[0.98] active:scale-[0.96]
                     flex items-center justify-center gap-2"
        >
          {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
          {quantity > 1 && !addedToCart && product.inStock && (
            <span className="bg-black/10 dark:bg-white/10 px-2 py-1 rounded-lg text-xs">
              ×{quantity}
            </span>
          )}
        </button>
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3 text-sm text-gray-500 dark:text-gray-500">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;