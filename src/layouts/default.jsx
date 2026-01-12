import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function DefaultLayout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}