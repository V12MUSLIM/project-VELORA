import { Route, Routes } from "react-router-dom";
import ProductProvider from "./contexts/productContext.jsx";
import IndexPage from "./pages/index.jsx";
import ShopPage from "./pages/Shop.jsx";
import DealsPage from "./pages/deals.jsx";
import Categories from "./pages/Categories.jsx";
import AboutPage from "./pages/about.jsx";
import ProductDetails from "./pages/productDetails.jsx";
import Cart from "./pages/cart.jsx";
import NotFoundPage from "./pages/notFound.jsx";

function App() {
  return (
    <ProductProvider>
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
    </ProductProvider>
  );
}

export default App;