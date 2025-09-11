import { useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, Tag, Truck, Shield, CreditCard, ShoppingBag } from "lucide-react";
import DefaultLayout from "../layouts/default";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        cartTotal,
        totalSavings
    } = useCart();

    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const shipping = cartTotal > 500 ? 0 : 20;
    const tax = cartTotal * 0.1;
    const total = cartTotal + shipping + tax - discount;

    const handleGoToShop = () => {
        navigate('/shop');
    };
    
    const applyPromoCode = () => {
        if (promoCode.toUpperCase() === "SAVE10") {
            setDiscount(cartTotal * 0.1); 
        } else if (promoCode.toUpperCase() === "SAVE20") {
            setDiscount(cartTotal * 0.2); 
        } else {
            setDiscount(0);
            alert("Invalid promo code");
        }
    };

    const handleCheckout = () => {
        setIsLoading(true);
        setTimeout(() => {
            alert("Proceeding to checkout...");
            setIsLoading(false);
        }, 1500);
    };

    return (
       <DefaultLayout>
        <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white transition-colors duration-300">
            <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-5 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                Shopping Cart
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handleGoToShop}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 dark:border dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all group text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 sm:px-6 lg:py-8">
                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-700 mb-6" />
                        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
                        <button 
                            onClick={handleGoToShop}
                            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black transition-all dark:bg-white dark:text-black dark:hover:shadow-lg dark:hover:shadow-yellow-500/25"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bg-white dark:bg-black rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                            <div className="w-full sm:w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-lg flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <span className="text-xs font-semibold text-blue-600 dark:text-yellow-400 tracking-wider">
                                                                {item.category}
                                                            </span>
                                                            <h3 className="text-base sm:text-lg font-semibold mt-1">{item.name}</h3>
                                                        </div>
                                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 dark:text-gray-500 p-1">
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-lg sm:text-xl font-bold">${item.price.toFixed(2)}</span>
                                                        {item.originalPrice && <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between mt-2 sm:mt-auto gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-300 dark:hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-300 dark:hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                                                        <p className="text-base sm:text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white dark:bg-black rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="w-5 h-5 text-blue-600 dark:text-yellow-400" />
                                    <h3 className="font-semibold">Have a promo code?</h3>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                                    />
                                    <button
                                        onClick={applyPromoCode}
                                        className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {discount > 0 && (
                                    <p className="mt-3 text-green-600 dark:text-green-400 text-sm">
                                        ✓ Promo code applied! You saved ${discount.toFixed(2)}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-black rounded-xl p-6 border border-gray-200 dark:border-gray-800 sticky top-8">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-800">
                                     <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    {totalSavings > 0 && (
                                        <div className="flex justify-between text-green-500 dark:text-green-400">
                                            <span>Total Savings</span>
                                            <span>-${totalSavings.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-500 dark:text-green-400">
                                            <span>Promo Discount</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-6">
                                    <span className="text-lg font-semibold">Total</span>
                                    <span className="text-2xl font-bold text-black dark:text-white">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="w-full py-3 dark:bg-white dark:text-black bg-black text-white font-bold rounded-lg hover:shadow-lg hover:shadow-gray-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed "
                                >
                                    {isLoading ? (
                                         <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Proceed to Checkout'
                                    )}
                                </button>
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                        <Truck className="w-4 h-4" />
                                        <span>Free shipping on orders over $500</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                        <Shield className="w-4 h-4" />
                                        <span>Secure checkout</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                        <CreditCard className="w-4 h-4" />
                                        <span>Multiple payment options</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </DefaultLayout>
    );
}