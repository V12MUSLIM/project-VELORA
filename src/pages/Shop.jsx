import { title } from "../components/primitives.jsx";
import DefaultLayout from "../layouts/default.jsx";
import { useProducts } from "../contexts/productContext";
import ProductCard from "../components/ProductCard.jsx";

export default function ShopPage() {
  const { products } = useProducts();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "foreground" })}>Shop</h1>
          <p className="text-default-500 mt-2">Discover our amazing products</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
