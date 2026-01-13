import DefaultLayout from "../layouts/default";
import { useProducts } from "../contexts/productContext";
import { useCart } from "../contexts/CartContext";
import { useEffect, useState, useMemo } from "react";

export default function SmartDealsPage() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const bundleProducts = useMemo(() => products.slice(0, 3), [products]);
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60);

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

  const handleAddBundle = () => {
    bundleProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <DefaultLayout>
      {/* HERO BUNDLE */}
      <section className="min-h-[80vh] bg-black text-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE LEFT */}
          <div className="flex justify-center">
            <img
              src={bundleProducts[0]?.image}
              alt="Bundle Deal"
              className="max-h-[420px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* CONTENT RIGHT */}
          <div className="space-y-8">
            <span className="uppercase tracking-widest text-gray-400 text-sm">
              Smart Bundle Offer
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Buy More.
              <br />
              Save Bigger.
            </h1>

            <p className="text-gray-300 text-lg max-w-xl">
              Get <span className="text-white font-semibold">50% OFF</span> when you buy 2 products,
              and get the <span className="text-white font-semibold">3rd FREE</span>.
            </p>

            {/* Countdown */}
            <div className="text-3xl font-mono tracking-wider">
              {formatTime(timeLeft)}
            </div>

            {/* Mini Products */}
            <div className="flex gap-4">
              {bundleProducts.map((p) => (
                <div
                  key={p.id}
                  className="w-28 h-28 bg-zinc-900 rounded-xl flex items-center justify-center"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-20 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Rules */}
            <div className="border border-zinc-800 rounded-xl p-4 space-y-2 text-sm text-gray-300">
              <p>✔ Buy any 2 products → 10% OFF each</p>
              <p>✔ Add a 3rd product → FREE</p>
              <p>✔ Limited time only</p>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddBundle}
              className="px-10 py-4 bg-white text-black rounded-xl font-semibold hover:scale-[0.97] transition"
            >
              Add Bundle to Cart
            </button>
          </div>
        </div>
      </section>

      {/* MORE DEALS */}
      <section className="px-6 py-20 bg-white dark:bg-black">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-10">
          More Smart Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(3, 11).map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 dark:border-zinc-800 rounded-xl p-4 hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 mx-auto object-contain mb-4"
              />
              <h3 className="text-sm font-medium text-black dark:text-white line-clamp-2">
                {p.name}
              </h3>
              <p className="mt-2 text-lg font-semibold">
                ${p.price}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
