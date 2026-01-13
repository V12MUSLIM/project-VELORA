import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function HeroDealOfTheHour({ product }) {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(6 * 60 * 60);
  const soldPercent = 85;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => {
    const h = String(Math.floor(t / 3600)).padStart(2, "0");
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div className="space-y-8">
          <span className="inline-block text-sm tracking-widest text-gray-400 uppercase">
            Hero Deal of the Hour
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="flex items-end gap-4">
            <span className="text-4xl font-bold">${product.price}</span>
            <span className="text-xl line-through text-gray-500">
              ${product.originalPrice}
            </span>
          </div>

          {/* Countdown */}
          <div className="text-3xl font-mono tracking-wider">
            {formatTime(timeLeft)}
          </div>

          {/* Stock Bar */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">
              {soldPercent}% of the stock sold
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => addToCart(product, 1)}
            className="px-10 py-4 bg-white text-black rounded-xl font-semibold hover:scale-[0.98] transition"
          >
            Buy This Deal
          </button>

          {/* Add-on Dock */}
          <div className="border border-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-300">
              Complete your setup
            </p>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" />
              Add Pro Mouse (-20%)
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" />
              Add Headphones (-15%)
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
