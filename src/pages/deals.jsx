import DefaultLayout from "../layouts/default.jsx";
import { useProducts } from "../contexts/productContext";
import ProductCard from "../components/ProductCard.jsx";
import { useMemo, useState } from "react";
import {
  Flame,
  Star,
  Laptop,
  Headphones,
  Monitor,
  Tablet,
  Keyboard,
  Cpu,
  HardDrive,
  Smartphone,
  BookOpen,
} from "lucide-react";

const CATEGORY_MAP = {
  computers: ["computer", "computers", "pc", "laptop"],
  audio: ["audio", "headphone", "headphones"],
  tvs: ["tv", "tvs"],
  tablets: ["tablet", "tablets", "ipad"],
  accessories: ["accessories"],
  peripherals: ["peripherals", "keyboard", "mouse"],
  components: ["components", "component", "hardware"],
  storage: ["storage", "ssd", "hdd", "storg"],
  smartphones: ["smartphone", "phone", "mobile"],
  ereaders: ["e-reader", "ereaders", "kindle"],
  monitors: ["monitor", "monitors", "display"],
};

export default function DealsPage() {
  const { products, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("discount");

  const deals = useMemo(() => {
    return products.filter(
      (p) => p.originalPrice > p.price
    );
  }, [products]);

  const featuredDeals = useMemo(() => {
    return [...deals]
      .sort(
        (a, b) =>
          (b.originalPrice - b.price) -
          (a.originalPrice - a.price)
      )
      .slice(0, 4);
  }, [deals]);

  const filteredDeals = useMemo(() => {
    let list = deals;

    if (activeCategory !== "all") {
      list = deals.filter((p) => {
        const cat = p.category?.toLowerCase().trim();
        if (!cat) return false;

        return CATEGORY_MAP[activeCategory]?.some((key) =>
          cat.includes(key)
        );
      });
    }

    if (sortBy === "discount") {
      list = [...list].sort(
        (a, b) =>
          (b.originalPrice - b.price) -
          (a.originalPrice - a.price)
      );
    }

    if (sortBy === "price") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    return list;
  }, [activeCategory, deals, sortBy]);

  return (
    <DefaultLayout>
      <section className="w-full py-16 text-center bg-gradient-to-b from-gray-100 to-transparent dark:from-zinc-900">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
          Deals That Matter
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Smart savings on products you actually want
        </p>
      </section>

      {featuredDeals.length > 0 && (
        <section className="w-full px-4 md:px-6 pb-16">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <Star size={18} />
            Featured Deals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  discountPercent: Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                    100
                  ),
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section className="w-full px-4 md:px-6 pb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3 overflow-x-auto">
          {[
            ["all", "All Deals", Flame],
            ["computers", "Computers", Laptop],
            ["audio", "Audio", Headphones],
            ["tvs", "TVs", Monitor],
            ["tablets", "Tablets", Tablet],
            ["accessories", "Accessories", Keyboard],
            ["peripherals", "Peripherals", Keyboard],
            ["components", "Components", Cpu],
            ["storage", "Storage", HardDrive],
            ["smartphones", "Smartphones", Smartphone],
            ["monitors", "Monitors", Monitor],
            ["ereaders", "E-Readers", BookOpen],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border whitespace-nowrap
                ${activeCategory === key
                  ? "border-black text-black dark:border-white dark:text-white"
                  : "border-gray-300 text-gray-600 dark:border-zinc-700 dark:text-gray-400"
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
    px-4 py-2 rounded-lg text-sm font-medium
    bg-white dark:bg-zinc-900
    text-gray-900 dark:text-gray-200
    border border-gray-300 dark:border-zinc-700
    focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
    transition-colors
  "
        >
          <option value="discount" className="bg-white dark:bg-zinc-900">
            Highest Discount
          </option>
          <option value="price" className="bg-white dark:bg-zinc-900">
            Lowest Price
          </option>
        </select>
      </section>

      <section className="w-full px-4 md:px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-gray-200 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredDeals.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No deals available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  discountPercent: Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                    100
                  ),
                }}
              />
            ))}
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
