// src/pages/ProductDetails.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../contexts/productContext";
import DefaultLayout from "../layouts/default";

const ProductImageGallery = ({ product, selectedImage, setSelectedImage }) => {
  return (
    <>
      <style>{`
        .image-gallery {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .main-image-container {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
        }
        
        .main-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
        }
        
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        
        .thumbnail-button {
          width: 100%;
          height: 50px;
          padding: 2px;
          border: 2px solid transparent;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .thumbnail-button.active {
          border-color: rgb(59, 130, 246);
          background: rgba(59, 130, 246, 0.1);
        }
        
        .thumbnail-button:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.05);
        }
        
        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .main-image-container {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .thumbnail-button {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .thumbnail-button.active {
            border-color: rgb(96, 165, 250);
            background: rgba(96, 165, 250, 0.1);
          }
          
          .thumbnail-button:hover {
            border-color: rgba(96, 165, 250, 0.5);
            background: rgba(96, 165, 250, 0.05);
          }
        }
        
        /* Small devices (iPhone 4-5): 320px - 374px */
        @media (min-width: 320px) {
          .image-gallery {
            gap: 10px;
          }
          
          .main-image {
            height: 250px;
          }
          
          .thumbnail-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
          }
          
          .thumbnail-button {
            height: 45px;
          }
        }
        
        /* iPhone 6-8: 375px - 413px */
        @media (min-width: 375px) {
          .main-image {
            height: 280px;
          }
          
          .thumbnail-button {
            height: 50px;
          }
        }
        
        /* iPhone Plus/Max: 414px - 767px */
        @media (min-width: 414px) {
          .image-gallery {
            gap: 12px;
          }
          
          .main-image {
            height: 320px;
          }
          
          .thumbnail-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
          }
          
          .thumbnail-button {
            height: 55px;
          }
        }
        
        /* Tablets: 768px - 1023px */
        @media (min-width: 768px) {
          .main-image {
            height: 400px;
          }
          
          .thumbnail-button {
            height: 60px;
          }
        }
        
        /* Desktop: 1024px and up */
        @media (min-width: 1024px) {
          .image-gallery {
            gap: 16px;
          }
          
          .main-image-container {
            border-radius: 16px;
          }
          
          .main-image {
            height: 500px;
          }
          
          .thumbnail-grid {
            gap: 10px;
          }
          
          .thumbnail-button {
            height: 70px;
            border-radius: 10px;
          }
        }
      `}</style>
      
      <div className="image-gallery">
        <div className="main-image-container">
          <img
            src={product.gallery?.[selectedImage] || product.image}
            alt={product.name}
            className="main-image"
          />
        </div>
        {product.gallery && product.gallery.length > 1 && (
          <div className="thumbnail-grid">
            {product.gallery.map((img, index) => (
              <button
                key={index}
                className={`thumbnail-button ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const ProductInfo = ({ product }) => {
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "star filled" : "star"}
      >
        ★
      </span>
    ));

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <style>{`
        .product-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .product-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .category-chip {
          background: rgba(139, 92, 246, 0.1);
          color: rgb(124, 58, 237);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 500;
          width: fit-content;
          text-transform: uppercase;
        }
        
        .product-title {
          font-size: 20px;
          font-weight: 700;
          color: rgb(0, 0, 0);
          line-height: 1.2;
          margin: 0;
        }
        
        .rating-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .stars {
          display: flex;
          gap: 2px;
        }
        
        .star {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.3);
        }
        
        .star.filled {
          color: rgb(245, 158, 11);
        }
        
        .rating-text {
          color: rgba(0, 0, 0, 0.5);
          font-size: 14px;
        }
        
        .price-section {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .current-price {
          font-size: 28px;
          font-weight: 700;
          color: rgb(34, 197, 94);
        }
        
        .original-price {
          font-size: 18px;
          color: rgba(0, 0, 0, 0.4);
          text-decoration: line-through;
        }
        
        .discount-badge {
          background: rgba(245, 158, 11, 0.1);
          color: rgb(217, 119, 6);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .stock-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.1);
          color: rgb(22, 163, 74);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 8px;
          padding: 8px 12px;
          width: fit-content;
        }
        
        .stock-status.out-of-stock {
          background: rgba(239, 68, 68, 0.1);
          color: rgb(220, 38, 38);
          border-color: rgba(239, 68, 68, 0.2);
        }
        
        .stock-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgb(34, 197, 94);
        }
        
        .stock-indicator.out-of-stock {
          background: rgb(239, 68, 68);
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .category-chip {
            background: rgba(139, 92, 246, 0.1);
            color: rgb(167, 139, 250);
          }
          
          .product-title {
            color: rgb(255, 255, 255);
          }
          
          .star {
            color: rgba(255, 255, 255, 0.3);
          }
          
          .star.filled {
            color: rgb(251, 191, 36);
          }
          
          .rating-text {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .original-price {
            color: rgba(255, 255, 255, 0.4);
          }
        }
        
        /* Small devices (iPhone 4-5): 320px - 374px */
        @media (min-width: 320px) {
          .product-info {
            gap: 12px;
          }
          
          .category-chip {
            font-size: 10px;
            padding: 3px 8px;
          }
          
          .product-title {
            font-size: 18px;
          }
          
          .star {
            font-size: 14px;
          }
          
          .rating-text {
            font-size: 12px;
          }
          
          .current-price {
            font-size: 24px;
          }
          
          .original-price {
            font-size: 16px;
          }
          
          .stock-status {
            padding: 6px 10px;
            font-size: 12px;
          }
        }
        
        /* iPhone 6-8: 375px - 413px */
        @media (min-width: 375px) {
          .category-chip {
            font-size: 11px;
            padding: 4px 10px;
          }
          
          .product-title {
            font-size: 19px;
          }
          
          .current-price {
            font-size: 26px;
          }
          
          .original-price {
            font-size: 17px;
          }
        }
        
        /* iPhone Plus/Max: 414px - 767px */
        @media (min-width: 414px) {
          .product-info {
            gap: 14px;
          }
          
          .category-chip {
            font-size: 12px;
            padding: 4px 12px;
          }
          
          .product-title {
            font-size: 20px;
          }
          
          .star {
            font-size: 15px;
          }
          
          .rating-text {
            font-size: 13px;
          }
          
          .current-price {
            font-size: 28px;
          }
          
          .original-price {
            font-size: 18px;
          }
        }
        
        /* Tablets: 768px - 1023px */
        @media (min-width: 768px) {
          .product-info {
            gap: 16px;
          }
          
          .product-title {
            font-size: 24px;
          }
          
          .star {
            font-size: 16px;
          }
          
          .rating-text {
            font-size: 14px;
          }
          
          .current-price {
            font-size: 32px;
          }
          
          .original-price {
            font-size: 20px;
          }
        }
        
        /* Desktop: 1024px and up */
        @media (min-width: 1024px) {
          .product-info {
            gap: 20px;
          }
          
          .product-title {
            font-size: 28px;
          }
          
          .star {
            font-size: 18px;
          }
          
          .current-price {
            font-size: 36px;
          }
          
          .original-price {
            font-size: 22px;
          }
          
          .stock-status {
            padding: 10px 16px;
          }
        }
      `}</style>
      
      <div className="product-info">
        <div className="product-header">
          <div className="category-chip">
            {product.category}
          </div>
          <h1 className="product-title">
            {product.name}
          </h1>
        </div>
        
        <div className="rating-section">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="rating-text">
            {product.rating} ({product.reviews?.length || 0} reviews)
          </span>
        </div>
        
        <div className="price-section">
          <span className="current-price">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="original-price">
              ${product.originalPrice}
            </span>
          )}
          {discountPercentage > 0 && (
            <div className="discount-badge">
              -{discountPercentage}%
            </div>
          )}
        </div>
        
        <div className={`stock-status ${!product.inStock ? 'out-of-stock' : ''}`}>
          <div className={`stock-indicator ${!product.inStock ? 'out-of-stock' : ''}`} />
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>
    </>
  );
};

const ProductActions = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product, quantity } });
  };

  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <>
      <style>{`
        .actions-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          padding: 16px;
        }
        
        .actions-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .quantity-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .quantity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        
        .quantity-control {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .quantity-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.7);
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.8);
          overflow: hidden;
        }
        
        .quantity-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: rgba(0, 0, 0, 0.05);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .quantity-btn:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity-input {
          width: 50px;
          height: 36px;
          border: none;
          text-align: center;
          background: transparent;
          font-weight: 500;
        }
        
        .subtotal-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        
        .subtotal-label {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
        }
        
        .subtotal-amount {
          font-size: 18px;
          font-weight: 700;
          color: rgb(0, 0, 0);
        }
        
        .unit-price-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .unit-price-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        
        .unit-price-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .quantity-chip {
          background: rgba(59, 130, 246, 0.1);
          color: rgb(59, 130, 246);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }
        
        .buttons-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .action-btn {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .add-to-cart-btn {
          background: rgb(249, 115, 22);
          color: white;
        }
        
        .add-to-cart-btn:hover:not(:disabled) {
          background: rgb(234, 88, 12);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
        }
        
        .buy-now-btn {
          background: rgb(59, 130, 246);
          color: white;
        }
        
        .buy-now-btn:hover:not(:disabled) {
          background: rgb(37, 99, 235);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .action-btn:disabled {
          background: rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.4);
          cursor: not-allowed;
        }
        
        .action-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .actions-card {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .quantity-label {
            color: rgba(255, 255, 255, 0.7);
          }
          
          .quantity-selector {
            border-color: rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.08);
          }
          
          .quantity-btn {
            background: rgba(255, 255, 255, 0.05);
            color: rgb(255, 255, 255);
          }
          
          .quantity-btn:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .quantity-input {
            color: rgb(255, 255, 255);
          }
          
          .subtotal-label {
            color: rgba(255, 255, 255, 0.5);
          }
          
          .subtotal-amount {
            color: rgb(255, 255, 255);
          }
          
          .unit-price-info {
            background: rgba(255, 255, 255, 0.02);
            border-color: rgba(255, 255, 255, 0.05);
            color: rgb(255, 255, 255);
          }
        }
        
        /* Small devices (iPhone 4-5): 320px - 374px */
        @media (min-width: 320px) {
          .actions-card {
            padding: 12px;
          }
          
          .actions-content {
            gap: 12px;
          }
          
          .quantity-btn {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
          
          .quantity-input {
            width: 40px;
            height: 32px;
            font-size: 14px;
          }
          
          .subtotal-amount {
            font-size: 16px;
          }
          
          .action-btn {
            height: 42px;
            font-size: 14px;
          }
          
          .buttons-row {
            gap: 10px;
          }
        }
        
        /* iPhone 6-8: 375px - 413px */
        @media (min-width: 375px) {
          .quantity-btn {
            width: 34px;
            height: 34px;
          }
          
          .quantity-input {
            width: 45px;
            height: 34px;
          }
          
          .action-btn {
            height: 44px;
            font-size: 15px;
          }
        }
        
        /* iPhone Plus/Max: 414px - 767px */
        @media (min-width: 414px) {
          .actions-card {
            padding: 16px;
          }
          
          .quantity-btn {
            width: 36px;
            height: 36px;
          }
          
          .quantity-input {
            width: 50px;
            height: 36px;
          }
          
          .subtotal-amount {
            font-size: 18px;
          }
          
          .action-btn {
            height: 46px;
            font-size: 16px;
          }
        }
        
        /* Tablets: 768px - 1023px */
        @media (min-width: 768px) {
          .buttons-row {
            flex-direction: row;
          }
          
          .action-btn {
            height: 48px;
          }
        }
        
        /* Desktop: 1024px and up */
        @media (min-width: 1024px) {
          .actions-card {
            padding: 20px;
            border-radius: 16px;
          }
          
          .actions-content {
            gap: 20px;
          }
          
          .action-btn {
            height: 52px;
            border-radius: 12px;
          }
        }
      `}</style>
      
      <div className="actions-card">
        <div className="actions-content">
          {product.inStock && (
            <div className="quantity-section">
              <div className="quantity-row">
                <div className="quantity-control">
                  <label className="quantity-label">Quantity</label>
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="quantity-input"
                      min="1"
                      max="10"
                    />
                    <button 
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="subtotal-section">
                  <span className="subtotal-label">Subtotal:</span>
                  <span className="subtotal-amount">${subtotal}</span>
                </div>
              </div>

              {quantity > 1 && (
                <div className="unit-price-info">
                  <div className="unit-price-left">
                    <span>Unit price:</span>
                    <span style={{fontWeight: 500}}>${product.price}</span>
                  </div>
                  <div className="unit-price-right">
                    <span>×</span>
                    <div className="quantity-chip">{quantity}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="buttons-row">
            <button
              className="action-btn add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {addedToCart ? "✓" : ""}
                {quantity > 1 && (
                  <div className="quantity-chip" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>
                    ×{quantity}
                  </div>
                )}
              </div>
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
            
            <button
              className="action-btn buy-now-btn"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {quantity > 1 && (
                  <div className="quantity-chip" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>
                    ×{quantity}
                  </div>
                )}
              </div>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductDetailsTabs = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState("description");

  return (
    <>
      <style>{`
        .tabs-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        
        .tabs-container {
          width: 100%;
        }
        
        .tab-buttons {
          display: flex;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.3);
        }
        
        .tab-button {
          flex: 1;
          padding: 16px 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
          border-bottom: 2px solid transparent;
        }
        
        .tab-button.active {
          color: rgb(59, 130, 246);
          border-bottom-color: rgb(59, 130, 246);
          background: rgba(59, 130, 246, 0.05);
        }
        
        .tab-button:hover {
          color: rgb(59, 130, 246);
          background: rgba(59, 130, 246, 0.02);
        }
        
        .tab-content {
          padding: 20px;
        }
        
        .tab-description {
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.6;
          font-size: 14px;
        }
        
        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .spec-item {
          display: flex;
          flex-direction: column;
          padding: 12px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .spec-label {
          font-weight: 600;
          color: rgb(0, 0, 0);
          margin-bottom: 4px;
        }
        
        .spec-value {
          color: rgba(0, 0, 0, 0.6);
        }
        
        .no-specs {
          text-align: center;
          color: rgba(0, 0, 0, 0.5);
          font-style: italic;
          padding: 20px;
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .tabs-card {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
          }
          
          .tab-buttons {
            border-bottom-color: rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.03);
          }
          
          .tab-button {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .tab-button.active {
            color: rgb(96, 165, 250);
            border-bottom-color: rgb(96, 165, 250);
            background: rgba(96, 165, 250, 0.05);
          }
          
          .tab-button:hover {
            color: rgb(96, 165, 250);
            background: rgba(96, 165, 250, 0.02);
          }
          
          .tab-description {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .spec-item {
            background: rgba(255, 255, 255, 0.02);
            border-color: rgba(255, 255, 255, 0.05);
          }
          
          .spec-label {
            color: rgb(255, 255, 255);
          }
          
          .spec-value {
            color: rgba(255, 255, 255, 0.6);
          }
          
          .no-specs {
            color: rgba(255, 255, 255, 0.5);
          }
        }
        
        /* Small devices (iPhone 4-5): 320px - 374px */
        @media (min-width: 320px) {
          .tab-button {
            padding: 12px 8px;
            font-size: 12px;
          }
          
          .tab-content {
            padding: 16px;
          }
          
          .tab-description {
            font-size: 13px;
          }
          
          .spec-item {
            padding: 10px;
          }
        }
        
        /* iPhone 6-8: 375px - 413px */
        @media (min-width: 375px) {
          .tab-button {
            padding: 14px 12px;
            font-size: 13px;
          }
          
          .tab-content {
            padding: 18px;
          }
        }
        
        /* iPhone Plus/Max: 414px - 767px */
        @media (min-width: 414px) {
          .tab-button {
            padding: 16px 16px;
            font-size: 14px;
          }
          
          .tab-content {
            padding: 20px;
          }
          
          .tab-description {
            font-size: 14px;
          }
          
          .spec-item {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
          }
          
          .spec-label {
            margin-bottom: 0;
          }
        }
        
        /* Tablets: 768px - 1023px */
        @media (min-width: 768px) {
          .tab-button {
            padding: 18px 24px;
            font-size: 15px;
          }
          
          .tab-content {
            padding: 24px;
          }
          
          .tab-description {
            font-size: 15px;
          }
        }
        
        /* Desktop: 1024px and up */
        @media (min-width: 1024px) {
          .tabs-card {
            border-radius: 16px;
          }
          
          .tab-button {
            padding: 20px 30px;
            font-size: 16px;
          }
          
          .tab-content {
            padding: 30px;
          }
          
          .tab-description {
            font-size: 16px;
          }
        }
      `}</style>
      
      <div className="tabs-card">
        <div className="tabs-container">
          <div className="tab-buttons">
            <button
              className={`tab-button ${selectedTab === "description" ? "active" : ""}`}
              onClick={() => setSelectedTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-button ${selectedTab === "specifications" ? "active" : ""}`}
              onClick={() => setSelectedTab("specifications")}
            >
              Specifications
            </button>
          </div>
          
          <div className="tab-content">
            {selectedTab === "description" && (
              <p className="tab-description">{product.description}</p>
            )}
            
            {selectedTab === "specifications" && (
              <div className="specs-list">
                {product.specs?.length > 0 ? (
                  product.specs.map((spec, index) => (
                    <div key={index} className="spec-item">
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-specs">No specifications available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingSkeleton = () => (
  <>
    <style>{`
      .loading-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px 20px;
      }
      
      .loading-grid {
        display: grid;
        gap: 32px;
        margin-bottom: 32px;
      }
      
      .skeleton {
        background: linear-gradient(90deg, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 75%);
        background-size: 200% 100%;
        animation: loading 2s infinite;
        border-radius: 8px;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      .skeleton-image {
        width: 100%;
        height: 300px;
        border-radius: 12px;
      }
      
      .skeleton-thumbnails {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-top: 12px;
      }
      
      .skeleton-thumb {
        width: 100%;
        height: 50px;
        border-radius: 8px;
      }
      
      .skeleton-info {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .skeleton-title {
        height: 32px;
        width: 75%;
      }
      
      .skeleton-rating {
        height: 24px;
        width: 50%;
      }
      
      .skeleton-actions {
        height: 200px;
        width: 100%;
        border-radius: 12px;
      }
      
      .skeleton-tabs {
        height: 300px;
        width: 100%;
        border-radius: 12px;
      }
      
      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 75%);
          background-size: 200% 100%;
        }
      }
      
      /* Responsive breakpoints */
      @media (min-width: 768px) {
        .loading-grid {
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        
        .skeleton-image {
          height: 400px;
        }
        
        .skeleton-thumbnails {
          grid-template-columns: repeat(5, 1fr);
        }
        
        .skeleton-thumb {
          height: 60px;
        }
      }
      
      @media (min-width: 1024px) {
        .loading-container {
          padding: 24px 32px;
        }
        
        .skeleton-image {
          height: 500px;
        }
        
        .skeleton-thumb {
          height: 70px;
        }
      }
    `}</style>
    
    <div className="loading-container">
      <div className="loading-grid">
        <div>
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton-thumbnails">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton skeleton-thumb"></div>
            ))}
          </div>
        </div>
        
        <div className="skeleton-info">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-rating"></div>
          <div className="skeleton skeleton-actions"></div>
        </div>
      </div>
      
      <div className="skeleton skeleton-tabs"></div>
    </div>
  </>
);

// --- Main Product Details Page Component ---

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products?.find((p) => p.id === parseInt(id, 10));

  if (loading) {
    return (
      <>
        <style>{`
          .page-container {
            min-height: 100vh;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%);
          }
        `}</style>
        <DefaultLayout>
          <div className="page-container">
            <LoadingSkeleton />
          </div>
        </DefaultLayout>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <style>{`
          .not-found-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 64px 20px;
            text-align: center;
          }
          
          .not-found-card {
            max-width: 400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 16px;
            padding: 32px;
          }
          
          .not-found-emoji {
            font-size: 64px;
            margin-bottom: 16px;
          }
          
          .not-found-title {
            font-size: 24px;
            font-weight: 700;
            color: rgb(0, 0, 0);
            margin-bottom: 16px;
          }
          
          .not-found-text {
            color: rgba(0, 0, 0, 0.5);
            margin-bottom: 24px;
            line-height: 1.5;
          }
          
          .not-found-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
            justify-content: center;
          }
          
          .not-found-btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
          }
          
          .btn-secondary {
            background: transparent;
            color: rgb(0, 0, 0);
            border: 1px solid rgba(0, 0, 0, 0.2);
          }
          
          .btn-secondary:hover {
            background: rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.3);
          }
          
          .btn-primary {
            background: rgb(59, 130, 246);
            color: white;
            border: 1px solid rgb(59, 130, 246);
          }
          
          .btn-primary:hover {
            background: rgb(37, 99, 235);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          
          /* Dark mode */
          @media (prefers-color-scheme: dark) {
            .not-found-card {
              background: rgba(255, 255, 255, 0.05);
              border-color: rgba(255, 255, 255, 0.1);
            }
            
            .not-found-title {
              color: rgb(255, 255, 255);
            }
            
            .not-found-text {
              color: rgba(255, 255, 255, 0.5);
            }
            
            .btn-secondary {
              color: rgb(255, 255, 255);
              border-color: rgba(255, 255, 255, 0.2);
            }
            
            .btn-secondary:hover {
              background: rgba(255, 255, 255, 0.05);
              border-color: rgba(255, 255, 255, 0.3);
            }
          }
          
          /* Responsive */
          @media (min-width: 414px) {
            .not-found-buttons {
              flex-direction: row;
            }
          }
        `}</style>
        
        <DefaultLayout>
          <div className="not-found-container">
            <div className="not-found-card">
              <div className="not-found-emoji">❌</div>
              <h1 className="not-found-title">Product Not Found</h1>
              <p className="not-found-text">
                We couldn't find a product with the ID "{id}".
              </p>
              <div className="not-found-buttons">
                <button 
                  className="not-found-btn btn-secondary" 
                  onClick={() => navigate(-1)}
                >
                  ← Go Back
                </button>
                <Link 
                  to="/project-VELORA/shop"
                  className="not-found-btn btn-primary"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </>
    );
  }

  return (
    <>
      <style>{`
        .product-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 20px;
        }
        
        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          font-size: 14px;
        }
        
        .breadcrumb-link {
          color: rgb(59, 130, 246);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .breadcrumb-link:hover {
          color: rgb(37, 99, 235);
          text-decoration: underline;
        }
        
        .breadcrumb-separator {
          color: rgba(0, 0, 0, 0.4);
        }
        
        .breadcrumb-current {
          color: rgba(0, 0, 0, 0.6);
          font-weight: 500;
        }
        
        .product-grid {
          display: grid;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .product-info-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .breadcrumb-link {
            color: rgb(96, 165, 250);
          }
          
          .breadcrumb-link:hover {
            color: rgb(147, 197, 253);
          }
          
          .breadcrumb-separator {
            color: rgba(255, 255, 255, 0.4);
          }
          
          .breadcrumb-current {
            color: rgba(255, 255, 255, 0.6);
          }
        }
        
        /* Responsive breakpoints */
        @media (min-width: 414px) {
          .product-details-container {
            padding: 20px 24px;
          }
        }
        
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        
        @media (min-width: 1024px) {
          .product-details-container {
            padding: 24px 32px;
          }
          
          .product-grid {
            gap: 48px;
          }
        }
      `}</style>
      
      <DefaultLayout>
        <div className="product-details-container">
          <nav className="breadcrumbs">
            <Link to="/project-VELORA/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/project-VELORA/shop" className="breadcrumb-link">Shop</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          <div className="product-grid">
            <ProductImageGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            
            <div className="product-info-section">
              <ProductInfo product={product} />
              <ProductActions product={product} />
            </div>
          </div>

          <ProductDetailsTabs product={product} />
        </div>
      </DefaultLayout>
    </>
  );
}