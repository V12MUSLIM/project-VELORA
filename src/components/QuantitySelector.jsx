import { useState } from "react";

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  max = 10, 
  min = 1, 
  className = "" 
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = Math.max(min, Math.min(max, parseInt(e.target.value) || min));
    onQuantityChange(value);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-12 h-12 flex items-center justify-center border border-gray-300 dark:border-gray-700 
                   rounded-l-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800
                   disabled:opacity-40 disabled:cursor-not-allowed text-black dark:text-white
                   transition-all duration-200 font-medium text-lg"
      >
        −
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="w-16 h-12 text-center border-t border-b border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-black text-black dark:text-white font-medium
                   focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900
                   transition-all duration-200"
        min={min}
        max={max}
      />
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-12 h-12 flex items-center justify-center border border-gray-300 dark:border-gray-700 
                   rounded-r-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800
                   disabled:opacity-40 disabled:cursor-not-allowed text-black dark:text-white
                   transition-all duration-200 font-medium text-lg"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;