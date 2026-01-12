import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/recommendations-swiper.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Recommendations({ products, currentProduct }) {
  if (!products || products.length === 0 || !currentProduct) {
    return null;
  }

  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category
    )
    .slice(0, 8);

  const displayProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((p) => p.id !== currentProduct.id).slice(0, 8);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl  text-black dark:text-white mb-6 sm:mb-8 font-semibold">
        You may also like
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // Mobile
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          // Tablet
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          // Large Desktop
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="recommendations-swiper"
      >
        {displayProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
