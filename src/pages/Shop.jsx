import { title } from "../components/primitives.jsx";
import DefaultLayout from "../layouts/default.jsx";
import { useProducts } from "../contexts/productContext";// adjust path if needed
import ProductCard from "../components/ProductCard.jsx"; // import the new component

export default function ShopPage() {
  // Get products from context
  const { products } = useProducts();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Shop</h1>
          <p className="text-default-500 mt-2">Discover our amazing products</p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}