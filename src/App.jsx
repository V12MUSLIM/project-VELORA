import { Route, Routes } from "react-router-dom";
import ProductProvider from "./contexts/productContext.jsx";

import IndexPage from "./pages/index.jsx";
import ShopPage from "./pages/Shop.jsx";
import DealsPage from "./pages/deals.jsx";
import Categories from "./pages/Categories.jsx";
import AboutPage from "./pages/about.jsx";
import ProductDetails from "./pages/productDetails.jsx";
import { Heading1 } from "lucide-react";

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/project-VELORA/" element={<IndexPage />} />
        <Route path="/project-VELORA/shop" element={<ShopPage />} />
        <Route path="/project-VELORA/deals" element={<DealsPage />} />
        <Route path="/project-VELORA/categories" element={<Categories />} />
        <Route path="/project-VELORA/about" element={<AboutPage />} />
        <Route
          path="/project-VELORA/shop/product/:id"
          element={<ProductDetails />}
        />
        <Route path="*" element={<h1>404 not found </h1>} />
        <Route path="/project-VELORA/cart" element={<h1>Hello,Cart</h1>}/>
      </Routes>
    </ProductProvider>
  );
}

export default App;
