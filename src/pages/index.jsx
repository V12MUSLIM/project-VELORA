import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

import BentoGrid from "../components/bentoGrid.jsx";
import DefaultLayout from "../layouts/default.jsx";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }
  }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function IndexPage() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const newsletterRef = useRef(null);
  const valuesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" });
  const productsInView = useInView(productsRef, { once: true, margin: "-100px" });
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIyMCIgZmlsbD0iIzAwMDAwMCIvPgo8dGV4dCB4PSIxNTAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5IZWFkcGhvbmVzPC90ZXh0Pgo8L3N2Zz4K",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Minimalist Watch Collection",
      price: "$199",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMDAwMDAwIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldhdGNoPC90ZXh0Pgo8L3N2Zz4K",
      category: "Accessories",
    },
    {
      id: 3,
      name: "Designer Backpack",
      price: "$149",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjcwIiB5PSI2MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxODAiIHJ4PSIxNSIgZmlsbD0iIzAwMDAwMCIvPgo8dGV4dCB4PSIxNTAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CYWNrcGFjazwvdGV4dD4KPC9zdmc+",
      category: "Fashion",
    },
    {
      id: 4,
      name: "Smart Home Device",
      price: "$89",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMDAwMDAwIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNGRkZGRkYiLz4KPHRleHQgeD0iMTUwIiB5PSIxNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U21hcnQ8L3RleHQ+Cjx0ZXh0IHg9IjE1MCIgeT0iMTc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRldmljZTwvdGV4dD4KPC9zdmc+",
      category: "Tech",
    },
  ];

  const categories = [
    { name: "Electronics", count: "120+ items" },
    { name: "Fashion", count: "85+ items" },
    { name: "Home & Living", count: "200+ items" },
    { name: "Beauty", count: "150+ items" },
  ];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <motion.div style={{ y, opacity }} className="container mx-auto px-6 text-center relative z-10">
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
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                VELORA
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto"
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
                  href="/products"
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
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 text-lg font-medium transition-all duration-300"
                  href="/about"
                  size="lg"
                  variant="bordered"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center"
              variants={staggerContainer}
            >
              {[
                { number: "500+", label: "Products" },
                { number: "50k+", label: "Customers" },
                { number: "4.9", label: "Rating" }
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <motion.div 
                    className="text-2xl font-bold text-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-foreground/50"
                    variants={fadeInUp}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* BentoGrid Section */}
        <motion.div 
          className="w-full mt-20"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        >
          <BentoGrid />
        </motion.div>
      </motion.section>

      {/* Categories Section */}
      <motion.section 
        ref={categoriesRef}
        className="py-20 bg-background"
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
              variants={fadeInDown}
            >
              Shop by Category
            </motion.h2>
            <motion.p 
              className="text-foreground/70 text-lg max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Explore our carefully curated collections designed for every
              aspect of your life.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={scaleIn}>
                <Card
                  className="group cursor-pointer border-2 hover:border-foreground"
                  isPressable
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardBody className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 bg-foreground rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-6 h-6 bg-background rounded" />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold mb-2 text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p 
                      className="text-foreground/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {category.count}
                    </motion.p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        ref={productsRef}
        className="py-20 bg-default-50"
        initial="hidden"
        animate={productsInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
              variants={fadeInDown}
            >
              Featured Products
            </motion.h2>
            <motion.p 
              className="text-foreground/70 text-lg"
              variants={fadeInUp}
            >
              Handpicked items that define quality and style.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={scaleIn}>
                <Card
                  className="group cursor-pointer overflow-hidden"
                  isPressable
                  whileHover={{ 
                    y: -15,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardBody className="p-0">
                    <motion.div 
                      className="aspect-square overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.img
                        alt={product.name}
                        className="w-full h-full object-cover"
                        src={product.image}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </motion.div>
                  </CardBody>
                  <CardFooter className="flex flex-col items-start p-4">
                    <motion.p 
                      className="text-xs text-foreground/50 uppercase tracking-wider mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {product.category}
                    </motion.p>
                    <motion.h3 
                      className="font-semibold text-lg mb-2 text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {product.name}
                    </motion.h3>
                    <motion.p 
                      className="text-xl font-bold text-foreground"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                    >
                      {product.price}
                    </motion.p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <Button
              as={Link}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium transition-all duration-300"
              href="/products"
              size="lg"
              variant="bordered"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Products
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        ref={newsletterRef}
        className="py-20 bg-foreground text-background"
        initial="hidden"
        animate={newsletterInView ? "visible" : "hidden"}
      >
        <motion.div className="container mx-auto px-6 text-center" variants={staggerContainer}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInDown}
          >
            Stay in the Loop
          </motion.h2>
          <motion.p 
            className="text-background/70 text-lg mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Be the first to know about new arrivals, exclusive offers, and style
            tips.
          </motion.p>

          <motion.div 
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft} className="flex-1">
              <Input
                className="flex-1"
                classNames={{
                  input: "text-foreground placeholder:text-foreground/40",
                  inputWrapper:
                    "bg-background/10 border-background/20 hover:bg-background/20 focus-within:bg-background/20",
                }}
                placeholder="Enter your email"
                type="email"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
            <motion.div variants={slideInRight}>
              <Button 
                className="bg-background text-foreground hover:bg-background/90 font-medium px-8 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-background/60 text-sm mt-4"
            variants={fadeInUp}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Brand Values */}
      <motion.section 
        ref={valuesRef}
        className="py-20 bg-background"
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="container mx-auto px-6"
          variants={staggerContainer}
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                icon: "w-8 h-8 border-2 border-background rounded",
                title: "Premium Quality",
                description: "Every product is carefully selected and tested for the highest standards."
              },
              {
                icon: "w-8 h-8 border-2 border-background rounded-full",
                title: "Fast Shipping",
                description: "Free shipping on orders over $100. Express delivery available."
              },
              {
                icon: "w-6 h-6 bg-background rounded-sm",
                title: "Easy Returns",
                description: "30-day return policy. Your satisfaction is our priority."
              }
            ].map((value, index) => (
              <motion.div key={index} variants={scaleIn}>
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-foreground rounded-full flex items-center justify-center"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={value.icon} />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-2 text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {value.title}
                </motion.h3>
                <motion.p 
                  className="text-foreground/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </DefaultLayout>
  );
}