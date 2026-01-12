import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

import BentoGrid from "../components/bentoGrid.jsx";
import DefaultLayout from "../layouts/default.jsx";
import { useProducts } from "../contexts/productContext.jsx";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] },
  },
};

const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function IndexPage() {
  const { products } = useProducts();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const newsletterRef = useRef(null);
  const valuesRef = useRef(null);
  const featuredRef = useRef(null);
  const testimonialsRef = useRef(null);
  const storyRef = useRef(null);
  const galleryRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const categoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });
  const productsInView = useInView(productsRef, {
    once: true,
    margin: "-100px",
  });
  const newsletterInView = useInView(newsletterRef, {
    once: true,
    margin: "-100px",
  });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const featuredInView = useInView(featuredRef, {
    once: true,
    margin: "-100px",
  });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-100px",
  });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  // Get premium products from context
  const premiumProducts = products
    .filter(
      (p) =>
        p.badge === "Premium" || p.badge === "Pro" || p.badge === "Professional"
    )
    .slice(0, 4);

  // Get featured deals
  const dealsProducts = products
    .filter((p) => p.originalPrice && p.originalPrice - p.price > 100)
    .slice(0, 3);

  const categories = [
    {
      name: "Audio",
      count: `${products.filter((p) => p.category === "Audio").length} items`,
      image: products.find((p) => p.category === "Audio")?.image,
      description: "Premium sound experiences",
    },
    {
      name: "Computers",
      count: `${products.filter((p) => p.category === "Computers").length} items`,
      image: products.find((p) => p.category === "Computers")?.image,
      description: "Power meets performance",
    },
    {
      name: "Cameras",
      count: `${products.filter((p) => p.category === "Cameras").length} items`,
      image: products.find((p) => p.category === "Cameras")?.image,
      description: "Capture every moment",
    },
    {
      name: "Smartphones",
      count: `${products.filter((p) => p.category === "Smartphones").length} items`,
      image: products.find((p) => p.category === "Smartphones")?.image,
      description: "Innovation in your pocket",
    },
  ];

  const testimonials = [
    {
      name: "Alexandra Chen",
      role: "Tech Enthusiast",
      content:
        "VELORA has completely transformed my tech setup. The quality is unmatched, and the customer service is exceptional. Every product feels premium.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Marcus Rodriguez",
      role: "Professional Photographer",
      content:
        "As a professional, I need equipment I can trust. VELORA delivers on every promise. The Canon EOS R5 I purchased here has been absolutely flawless.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Sophie Laurent",
      role: "Creative Director",
      content:
        "The attention to detail in every aspect - from product selection to packaging - shows VELORA's commitment to excellence. My go-to for premium tech.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  // Gallery items from products
  const galleryItems = products.slice(0, 6).map((p) => ({
    image: p.image,
    title: p.name,
    category: p.category,
  }));

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div className="max-w-4xl mx-auto" variants={staggerContainer}>
            <motion.div className="mb-12" variants={fadeInDown}>
              <motion.video
                autoPlay
                muted
                loop
                className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <source
                  src={`${import.meta.env.BASE_URL}Minimalist_Logo_Animation_Generation.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </motion.video>
            </motion.div>

            <motion.h1
              className="font-playfair text-6xl md:text-8xl font-bold mb-6 tracking-tight"
              variants={fadeInUp}
            >
              <motion.span
                className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent inline-block"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                VELORA
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto font-light tracking-wide"
              variants={fadeInUp}
            >
              Discover premium products crafted for the modern lifestyle. Where
              elegance meets functionality.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              variants={staggerContainer}
            >
              <motion.div variants={slideInLeft}>
                <Button
                  as={Link}
                  className="bg-foreground text-background hover:opacity-80 px-8 py-3 text-lg font-medium transition-all duration-300"
                  href="/shop"
                  size="lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Shop Collection
                </Button>
              </motion.div>
              <motion.div variants={slideInRight}>
                <Button
                  as={Link}
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 text-lg font-medium transition-all duration-300"
                  href="/deals"
                  size="lg"
                  variant="bordered"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Deals
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-12 text-sm text-foreground/60"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span>30-Day Returns</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Categories Grid */}
      <motion.section
        ref={categoriesRef}
        className="py-32 "
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
      >
        <motion.div
          className="container mx-auto px-6"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInDown}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Explore by Category
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Discover our carefully curated collections across premium
              categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={scaleIn}>
                <Card
                  as={Link}
                  href={`/categories?category=${category.name}`}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
                  isPressable
                >
                  <CardBody className="p-0 relative">
                    <motion.div
                      className="aspect-square overflow-hidden relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        alt={category.name}
                        className="w-full h-full object-cover"
                        src={category.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-2">
                          {category.description}
                        </p>
                        <p className="text-white/50 text-xs uppercase tracking-wider">
                          {category.count}
                        </p>
                      </div>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button
              as={Link}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium transition-all duration-300"
              href="/categories"
              size="lg"
              variant="bordered"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Categories
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Brand Story Preview */}
 <motion.section
  ref={storyRef}
  className="
    py-32
    rounded-xl text-background
    overflow-hidden relative
  "
  initial="hidden"
  animate={storyInView ? 'visible' : 'hidden'}
>
  {/* BLURRED BACKGROUND IMAGE */}
  <div className="absolute inset-0 -z-10">
    <div
      className="
        w-full h-full
        bg-[url('background.png')] dark:bg-[url('light.png')]
        bg-cover bg-center
        blur-sm scale-110
      "
    />
  </div>

  {/* EXISTING DECORATION */}
 

  {/* CONTENT */}
  <motion.div
    className="container mx-auto px-6 relative z-10"
    variants={staggerContainer}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div variants={slideInLeft}>
        <motion.div
          className="inline-block mb-6 px-6 py-2 bg-background/10 backdrop-blur-sm rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-sm font-medium tracking-wider uppercase text-background/70">
            Our Story
          </span>
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight font-playfair leading-tight">
          Crafting Excellence Since Day One
        </h2>

        <p className="text-xl text-background/90 mb-6 leading-relaxed font-semibold">
          At VELORA, we believe that premium quality shouldn't be a luxury.
          Every product in our collection is meticulously selected to meet our
          exacting standards.
        </p>

        <p className="text-lg text-background/90 mb-8 leading-relaxed font-semibold">
          From cutting-edge technology to timeless design, we curate only the
          finest products that enhance your lifestyle and stand the test of time.
        </p>

        <Button
          as={Link}
          className="bg-background text-foreground hover:bg-background/90 px-8 py-3 font-medium transition-all duration-300"
          href="/about"
          size="lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More About Us
        </Button>
      </motion.div>

      <motion.div variants={slideInRight} className="relative">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="space-y-4"
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="tv.jpeg"
                alt="Product showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="laptop.jpeg"
                alt="Product showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 pt-8"
            initial={{ y: 0 }}
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="vr.jpeg"
                alt="Product showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="mouse.jpg"
                alt="Product showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</motion.section>


      {/* Bento Grid Section */}
      <section className="py-32 ">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Premium Selection
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Our most coveted products, now available for discerning customers
            </p>
          </motion.div>
          <BentoGrid />
        </div>
      </section>

      {/* Featured Products */}
      <motion.section
        ref={productsRef}
        className="py-32 bg-background"
        initial="hidden"
        animate={productsInView ? "visible" : "hidden"}
      >
        <motion.div
          className="container mx-auto px-6"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInDown}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Trending Now
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Discover what's capturing attention this season
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {premiumProducts.map((product, index) => (
              <motion.div key={product.id} variants={scaleIn}>
                <Card
                  as={Link}
                  href={`/product/${product.id}`}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
                  isPressable
                >
                  <CardBody className="p-0 relative">
                    <motion.div
                      className="aspect-square overflow-hidden relative"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover"
                        src={product.image}
                      />
                      {product.badge && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-foreground/90 backdrop-blur-sm text-background text-xs font-semibold tracking-wider uppercase rounded-full">
                          {product.badge}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </motion.div>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start p-6 bg-background">
                    <p className="text-xs text-foreground/50 uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-semibold text-lg mb-3 text-foreground line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 w-full">
                      <span className="text-2xl font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-foreground/40 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button
              as={Link}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium transition-all duration-300"
              href="/shop"
              size="lg"
              variant="bordered"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Products
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        className="py-32 "
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
      >
        <motion.div
          className="container mx-auto px-6"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInDown}>
            <motion.div
              className="inline-block mb-4 px-6 py-2 bg-foreground/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium tracking-wider uppercase text-foreground/70">
                Customer Stories
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Loved by Thousands
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500">
                  <CardBody className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-foreground/10"
                      />
                      <div>
                        <h4 className="font-semibold text-lg text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-foreground/60">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-foreground"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-foreground/70 leading-relaxed font-light">
                      "{testimonial.content}"
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Instagram-style Gallery */}
      <motion.section
        ref={galleryRef}
        className="py-32 bg-background"
        initial="hidden"
        animate={galleryInView ? "visible" : "hidden"}
      >
        <motion.div
          className="container mx-auto px-6"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInDown}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              #VELORALifestyle
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Join our community and share your VELORA moments
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerContainer}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">
                      {item.title}
                    </p>
                    <p className="text-white/70 text-xs uppercase tracking-wider">
                      {item.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Button
              as="a"
              href="https://instagram.com/velora"
              target="_blank"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium transition-all duration-300"
              size="lg"
              variant="bordered"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Follow @VELORA
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        ref={newsletterRef}
        className="py-32 bg-foreground text-background relative rounded-xl overflow-hidden"
        initial="hidden"
        animate={newsletterInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
        </div>

        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          variants={staggerContainer}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 bg-background/10 backdrop-blur-sm rounded-full"
            variants={fadeInDown}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium tracking-wider uppercase text-background/70">
              Exclusive Access
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair"
            variants={fadeInDown}
          >
            Stay in the Loop
          </motion.h2>

          <motion.p
            className="text-background/70 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            variants={fadeInUp}
          >
            Be the first to know about new arrivals, exclusive offers, and
            insider tips. Join our community of discerning shoppers.
          </motion.p>

          <motion.div
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft} className="flex-1">
              <Input
                className="flex-1"
                classNames={{
                  input:
                    "text-foreground placeholder:text-foreground/40 text-base",
                  inputWrapper:
                    "bg-background/10 border-background/20 hover:bg-background/20 focus-within:bg-background/20 h-14",
                }}
                placeholder="Enter your email"
                size="lg"
                type="email"
              />
            </motion.div>
            <motion.div variants={slideInRight}>
              <Button
                className="bg-background text-foreground hover:bg-background/90 font-medium px-8 h-14 transition-all duration-300"
                size="lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-background/60 text-sm mt-6 font-light"
            variants={fadeInUp}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Brand Values */}
      <motion.section
        ref={valuesRef}
        className="py-32 bg-background"
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
      >
        <motion.div
          className="container mx-auto px-6"
          variants={staggerContainer}
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Premium Quality",
                description:
                  "Every product is carefully selected and tested for the highest standards of excellence and durability.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Fast Shipping",
                description:
                  "Free shipping on orders over $100. Express delivery available for urgent purchases.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ),
                title: "Easy Returns",
                description:
                  "30-day return policy with no questions asked. Your satisfaction is our top priority.",
              },
            ].map((value, index) => (
              <motion.div key={index} variants={scaleIn}>
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground font-playfair">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed font-light">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </DefaultLayout>
  );
}
