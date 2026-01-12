import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import {Tooltip} from "@heroui/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Best Sellers", href: "/shop?filter=bestsellers" },
      { label: "Sale", href: "/deals" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
    categories: [
      { label: "Audio", href: "/categories?category=Audio" },
      { label: "Computers", href: "/categories?category=Computers" },
      { label: "Cameras", href: "/categories?category=Cameras" },
      { label: "Smartphones", href: "/categories?category=Smartphones" },
      { label: "Gaming", href: "/categories?category=Gaming" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact", href: "/contact" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Order Tracking", href: "/track" },
      { label: "Warranty", href: "/warranty" },
      { label: "FAQs", href: "/faq" },
    ],
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "https://instagram.com/velora",
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      href: "https://twitter.com/velora",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "https://facebook.com/velora",
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      href: "https://youtube.com/velora",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://linkedin.com/company/velora",
    },
  ];

const paymentMethods = [
  {
    name: "Visa",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2560px-Visa_2021.svg.png",
  },
  {
    name: "Mastercard",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png",
  },
  {
    name: "PayPal",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/PayPal_Logo2014.svg/1099px-PayPal_Logo2014.svg.png",
  },
  {
    name: "Apple Pay",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Apple_Pay_Acceptance_Mark.svg/2560px-Apple_Pay_Acceptance_Mark.svg.png",
  },
  {
    name: "Google Pay",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/960px-Google_Pay_Logo.svg.png",
  },
  {
    name: "Meeza",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Meeza.svg/1200px-Meeza.svg.png",
  },
];


  return (
    <footer className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      {/* Subtle background pattern for light mode */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="py-16 border-b border-gray-200 dark:border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div className="lg:col-span-2" variants={fadeInUp}>
              <Link href="/" className="inline-block mb-6">
                <motion.h2
                  className="text-4xl font-bold font-playfair tracking-tight text-gray-900 dark:text-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  VELORA
                </motion.h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-light">
                Curating premium products for the modern lifestyle. Where
                elegance meets functionality, and quality is never compromised.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                  Stay Updated
                </p>
                <div className="flex gap-2">
                  <Input
                    classNames={{
                      input:
                        "text-gray-900 placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-400",
                      inputWrapper:
                        "bg-white dark:bg-white/10 border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:bg-white/20 focus-within:border-gray-400 dark:focus-within:bg-white/20",
                    }}
                    placeholder="Your email"
                    size="sm"
                    type="email"
                  />
                  <Button
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-medium px-6"
                    size="sm"
                  >
                    Join
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Get exclusive offers and updates
                </p>
              </div>
            </motion.div>

            {/* Shop Links */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider text-gray-900 dark:text-white">
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <Link
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-light"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories Links */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider text-gray-900 dark:text-white">
                Categories
              </h3>
              <ul className="space-y-3">
                {footerLinks.categories.map((link, index) => (
                  <li key={index}>
                    <Link
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-light"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider text-gray-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-light"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider text-gray-900 dark:text-white">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm font-light"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Media Links */}
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            variants={fadeInUp}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200 mr-2">
              Follow Us
            </span>
            {socialLinks.map((social, index) => (
                
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-gray-900 dark:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              className="text-center lg:text-left"
              variants={fadeInUp}
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
                © {currentYear} VELORA. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start">
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs transition-colors"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs transition-colors"
                  href="/terms"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs transition-colors"
                  href="/cookies"
                >
                  Cookie Policy
                </Link>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fadeInUp}
            >
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-2">
                We Accept
              </span>
              {paymentMethods.map((method, index) => (
                <div key={index}>
                    <Tooltip content={`${method.name}`}>
                  <img  src={method.icon} alt={method.name} className="h-6" />
                  </Tooltip>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10"
            variants={fadeInUp}
          >
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 text-gray-600 dark:text-gray-400 text-xs">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="uppercase tracking-wider">
                  Secure Shopping
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                <span className="uppercase tracking-wider">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="uppercase tracking-wider">
                  Best Price Guarantee
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                <span className="uppercase tracking-wider">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="uppercase tracking-wider">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
