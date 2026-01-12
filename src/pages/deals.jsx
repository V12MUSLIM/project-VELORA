import DefaultLayout from "../layouts/default.jsx";
import { useProducts } from "../contexts/productContext";
import ProductCard from "../components/ProductCard.jsx";
import { useMemo, useState } from "react";
import {
  Grid3x3,
  Laptop,
  Headphones,
  Monitor,
  Tablet,
  Cpu,
  HardDrive,
  Flame,
  Star,
  BadgePercent,
} from "lucide-react";

const getDiscountPercent = (product) =>
  Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

function DealsSection({ title, products, icon }) {
  const [showAll, setShowAll] = useState(false);

  if (products.length === 0) return null;

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="w-full px-4 md:px-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-black dark:text-white">
          {icon}
          {title}
        </h2>

        {products.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function DealsPage() {
  const { products, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");

  const deals = useMemo(() => {
    return products.filter(
      (p) =>
        p.originalPrice &&
        p.price &&
        p.originalPrice > p.price
    );
  }, [products]);

  const categoryDeals = useMemo(() => {
    if (activeCategory === "all") return deals;

    return deals.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().trim() === activeCategory
    );
  }, [activeCategory, deals]);

  const withDiscount = (list) =>
    list.map((p) => ({
      ...p,
      discountPercent: getDiscountPercent(p),
    }));

  const megaDeals = useMemo(
    () => withDiscount(categoryDeals.filter((p) => getDiscountPercent(p) >= 30)),
    [categoryDeals]
  );

  const hotDeals = useMemo(
    () =>
      withDiscount(
        categoryDeals.filter(
          (p) => getDiscountPercent(p) >= 15 && getDiscountPercent(p) < 30
        )
      ),
    [categoryDeals]
  );

  const smartDeals = useMemo(
    () =>
      withDiscount(
        categoryDeals.filter(
          (p) => getDiscountPercent(p) >= 5 && getDiscountPercent(p) < 15
        )
      ),
    [categoryDeals]
  );

  return (
    <DefaultLayout>
      <section className="w-full py-10 text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Deals
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover the best discounts available now
        </p>
      </section>

      {/* Category Bar */}
      <section className="w-full px-4 md:px-6 pb-8">
        <div className="flex flex-wrap gap-3">
          {[
            ["all", "All", Grid3x3],
            ["computers", "Computers", Laptop],
            ["audio", "Audio", Headphones],
            ["tvs", "TVs", Monitor],
            ["tablets", "Tablets", Tablet],
            ["components", "Components", Cpu],
            ["storage", "Storage", HardDrive],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all
                ${
                  activeCategory === key
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-900 dark:text-gray-400 dark:hover:bg-zinc-800"
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <p className="text-center text-gray-500 mt-20">
          Loading deals...
        </p>
      ) : (
        <>
          {/* <DealsSection
            title="Mega Deals (30%+)"
            products={megaDeals}
            icon={<Flame size={20} />}
          /> */}

          <DealsSection
            title="Hot Deals (15–29%)"
            products={hotDeals}
            icon={<Star size={20} />}
          />

          <DealsSection
            title="Smart Deals (5–14%)"
            products={smartDeals}
            icon={<BadgePercent size={20} />}
          />
        </>
      )}
    </DefaultLayout>
  );
}
