import { useState } from "react";
export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {/* Cart items would be mapped here */}
                </div>
            )}
            <div className="mt-8 border-t pt-8">
                <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold">$0.00</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
