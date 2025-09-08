import { Route, Routes } from "react-router-dom";
import ProductProvider from "./contexts/productContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import IndexPage from "./pages/index.jsx";
import ShopPage from "./pages/Shop.jsx";
import DealsPage from "./pages/deals.jsx";
import Categories from "./pages/Categories.jsx";
import AboutPage from "./pages/about.jsx";
import ProductDetails from "./pages/productDetails.jsx";
import Cart from "./pages/cart.jsx";
import NotFoundPage from "./pages/notFound.jsx";
import { ToastProvider } from "@heroui/react";
function App() {
  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider
          placement="top-center"
          toastOffset={60}
          classNames={{
            base: "!w-[700px]  !bg-white dark:!bg-black !border !border-gray-200 dark:!border-zinc-800 !shadow-lg [&>*]:!bg-white dark:[&>*]:!bg-black",
            title: "!text-black dark:!text-white !font-semibold",
            description: "!text-gray-700 dark:!text-zinc-300",
            closeButton:
              "!text-gray-500 dark:!text-zinc-400 hover:!text-black dark:hover:!text-white",
            content: "!bg-white dark:!bg-black",
          }}
        />
      </div>
      <ProductProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartProvider>
      </ProductProvider>
    </>
  );
}
export default App;
