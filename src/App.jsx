import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/index.jsx";
import ShopPage from "./pages/Shop.jsx";
import DealsPage from "./pages/deals.jsx";
import Categories from "./pages/Categories.jsx";
import AboutPage from "./pages/about.jsx";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/project-VELORA/" />
      <Route element={<ShopPage />} path="/project-VELORA/shop" />
      <Route element={<DealsPage />} path="/project-VELORA/deals" />
      <Route element={<Categories />} path="/project-VELORA/categories" />
      <Route element={<AboutPage />} path="/project-VELORA/about" />
    </Routes>
  );
}

export default App;
