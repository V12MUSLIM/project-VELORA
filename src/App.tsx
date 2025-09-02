import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ShopPage from "@/pages/Shop";
import DealsPage from "@/pages/deals";
import Categories from "@/pages/Categories";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ShopPage />} path="/shop" />
      <Route element={<DealsPage />} path="/deals" />
      <Route element={<Categories />} path="/categories" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
