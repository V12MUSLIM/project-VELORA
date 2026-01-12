import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

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

export default function AboutPage() {
 
  const { scrollYProgress } = useScroll();
  
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const milestonesRef = useRef(null);
  const commitmentRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const milestonesInView = useInView(milestonesRef, { once: true, margin: "-100px" });
  const commitmentInView = useInView(commitmentRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const coreValues = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Excellence",
      description: "We pursue perfection in every detail, from product selection to customer experience. Our commitment to excellence is unwavering."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Integrity",
      description: "Transparency and honesty guide every decision we make. We build trust through authentic relationships and ethical practices."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We stay ahead of trends, constantly seeking cutting-edge products that redefine what's possible in technology and design."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Customer First",
      description: "Your satisfaction drives everything we do. From curated selections to exceptional service, you're at the heart of VELORA."
    }
  ];

  const team = [
    {
      name: "Elena Martinez",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Visionary leader with 15 years in luxury retail"
    },
    {
      name: "David Chen",
      role: "Chief Product Officer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Technology expert passionate about innovation"
    },
    {
      name: "Sarah Johnson",
      role: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Dedicated to creating exceptional customer journeys"
    },
    {
      name: "Michael Roberts",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Aesthete bringing beauty to every touchpoint"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "VELORA was founded with a vision to democratize access to premium products."
    },
    {
      year: "2021",
      title: "Rapid Growth",
      description: "Expanded our catalog to over 500 curated products and reached 10,000 satisfied customers."
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Launched international shipping to 25 countries, bringing VELORA quality worldwide."
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Named 'Best Premium E-commerce Platform' by Tech Innovation Awards."
    },
    {
      year: "2024",
      title: "Sustainability Focus",
      description: "Committed to carbon-neutral shipping and sustainable packaging for all orders."
    },
    {
      year: "2025",
      title: "Community Driven",
      description: "Launched VELORA Community program, giving back 5% of profits to tech education."
    }
  ];

  const commitments = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sustainable Practices",
      description: "We're committed to reducing our environmental impact through eco-friendly packaging, carbon-neutral shipping, and partnerships with sustainable manufacturers."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Impact",
      description: "Through our Community program, we invest in tech education and digital literacy initiatives, empowering the next generation of innovators."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Quality Assurance",
      description: "Every product undergoes rigorous testing and quality checks. We stand behind our selections with comprehensive warranties and hassle-free returns."
    }
  ];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden "
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <motion.div 
          style={{ y, opacity }} 
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div className="max-w-4xl mx-auto" variants={staggerContainer}>
            <motion.div 
              className="inline-block mb-6 px-6 py-2 bg-foreground/10 rounded-full"
              variants={fadeInDown}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium tracking-wider uppercase text-foreground/70">
                Our Story
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-playfair text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-tight"
              variants={fadeInUp}
            >
              Redefining Premium
              <br />
              <motion.span 
                className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Shopping
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              variants={fadeInUp}
            >
              At VELORA, we believe that exceptional quality should be accessible. 
              We curate only the finest products that combine cutting-edge technology, 
              timeless design, and uncompromising craftsmanship.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-cente mb-3"
              variants={staggerContainer}
            >
              <motion.div variants={slideInLeft}>
                <Button
                  as={Link}
                  className="bg-foreground text-background hover:opacity-80 px-10 py-3 text-lg font-medium transition-all duration-300 "
                  href="/shop"
                  size="lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Collection
                </Button>
              </motion.div>
              <motion.div variants={slideInRight}>
                <Button
                  as={Link}
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-10 py-3 text-lg font-medium transition-all duration-300"
                  href="/contact"
                  size="lg"
                  variant="bordered"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Brand Story Section */}
      <motion.section 
        ref={storyRef}
        className="py-32 bg-background"
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
      >
        <motion.div className="container mx-auto px-6" variants={staggerContainer}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="space-y-6"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="watch.jpeg"
                        alt="Premium product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="monitor.jpg"
                        alt="Premium product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <motion.div 
                    className="space-y-6 pt-12"
                    initial={{ y: 0 }}
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="tower.jpeg"
                        alt="Premium product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="camera.jpeg"
                        alt="Premium product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative element */}
                <motion.div 
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-foreground/5 rounded-3xl"
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 5 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            <motion.div variants={slideInRight}>
              <motion.div 
                className="inline-block mb-6 px-6 py-2 bg-foreground/10 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium tracking-wider uppercase text-foreground/70">
                  Since 2020
                </span>
              </motion.div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight font-playfair leading-tight">
                A Vision Born from Passion
              </h2>
              
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p>
                  VELORA was founded on a simple yet powerful idea: premium quality shouldn't 
                  be exclusive to the few. Our founder, Elena Martinez, noticed a gap in the 
                  market for accessible luxury technology and decided to bridge it.
                </p>
                
                <p>
                  What started as a curated selection of exceptional audio equipment has evolved 
                  into a comprehensive platform offering the finest products across multiple 
                  categories. Each item in our collection is chosen with meticulous care, 
                  representing the perfect marriage of form and function.
                </p>
                
                <p>
                  Today, VELORA serves thousands of discerning customers worldwide, united by 
                  their appreciation for quality, design, and innovation. We're not just selling 
                  products—we're curating experiences and building a community of people who 
                  refuse to settle for anything less than extraordinary.
                </p>
              </div>

              <motion.div 
                className="mt-10 grid grid-cols-3 gap-8"
                variants={staggerContainer}
              >
                {[
                  { value: "50K+", label: "Happy Customers" },
                  { value: "1000+", label: "Premium Products" },
                  { value: "25+", label: "Countries Served" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    variants={scaleIn}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-foreground mb-2 font-playfair">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section 
        ref={valuesRef}
        className="py-32 "
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
      >
        <motion.div className="container mx-auto px-6" variants={staggerContainer}>
          <motion.div className="text-center mb-20" variants={fadeInDown}>
            <motion.div 
              className="inline-block mb-6 px-6 py-2 bg-foreground/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium tracking-wider uppercase text-foreground/70">
                What Drives Us
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Our Core Values
            </h2>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto font-light">
              These principles guide every decision we make and shape the VELORA experience
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <CardBody className="p-10">
                    <motion.div 
                      className="w-20 h-20 bg-foreground text-background rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground font-playfair">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Timeline/Milestones Section */}
      <motion.section 
        ref={milestonesRef}
        className="py-32 bg-background"
        initial="hidden"
        animate={milestonesInView ? "visible" : "hidden"}
      >
        <motion.div className="container mx-auto px-6" variants={staggerContainer}>
          <motion.div className="text-center mb-20" variants={fadeInDown}>
            <motion.div 
              className="inline-block mb-6 px-6 py-2 bg-foreground/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium tracking-wider uppercase text-foreground/70">
                Our Journey
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Milestones
            </h2>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto font-light">
              Key moments that shaped VELORA into what it is today
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="relative pl-12 md:pl-24 pb-16 last:pb-0"
              >
                {/* Timeline line */}
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 md:left-12 top-8 bottom-0 w-px bg-foreground/20" />
                )}
                
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-3 md:left-9 top-2 w-6 h-6 bg-foreground rounded-full border-4 border-background shadow-lg"
                  whileHover={{ scale: 1.3 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                />

                <div className="bg-foreground/5 rounded-2xl p-8 hover:bg-foreground/10 transition-colors duration-300">
                  <div className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-playfair">
                    {milestone.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed font-light">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        ref={teamRef}
        className="py-32"
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
      >
        <motion.div className="container mx-auto px-6" variants={staggerContainer}>
          <motion.div className="text-center mb-20" variants={fadeInDown}>
            <motion.div 
              className="inline-block mb-6 px-6 py-2 bg-foreground/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium tracking-wider uppercase text-foreground/70">
                Leadership
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Meet Our Team
            </h2>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto font-light">
              Passionate experts dedicated to delivering exceptional experiences
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardBody className="p-0">
                    <motion.div 
                      className="aspect-square overflow-hidden relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        alt={member.name}
                        className="w-full h-full object-cover"
                        src={member.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white/90 text-sm font-light">
                          {member.bio}
                        </p>
                      </div>
                    </motion.div>
                    <div className="p-6 bg-background">
                      <h3 className="text-xl font-bold text-foreground mb-1 font-playfair">
                        {member.name}
                      </h3>
                      <p className="text-sm text-foreground/60 uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Commitment Section */}
      <motion.section 
        ref={commitmentRef}
        className="py-32 rounded-xl bg-foreground text-background relative overflow-hidden"
        initial="hidden"
        animate={commitmentInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl" />
        </div>

        <motion.div className="container mx-auto px-6 relative z-10" variants={staggerContainer}>
          <motion.div className="text-center mb-20" variants={fadeInDown}>
            <motion.div 
              className="inline-block mb-6 px-6 py-2 bg-background/10 backdrop-blur-sm rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium tracking-wider uppercase text-background/70">
                Our Promise
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-playfair">
              Our Commitment
            </h2>
            <p className="text-xl text-background/70 max-w-3xl mx-auto font-light">
              Building a better future through responsible business practices
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
          >
            {commitments.map((commitment, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                className="text-center"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 bg-background/10 backdrop-blur-sm text-background rounded-2xl flex items-center justify-center shadow-2xl"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {commitment.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-background font-playfair">
                  {commitment.title}
                </h3>
                <p className="text-background/70 leading-relaxed font-light">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="py-32"
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="container mx-auto px-6 text-center"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInDown}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight font-playfair">
              Experience VELORA
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Join thousands of satisfied customers who've discovered the perfect blend of 
              quality, style, and innovation. Your journey to premium living starts here.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft}>
              <Button
                as={Link}
                className="bg-foreground text-background hover:opacity-80 px-12 py-4 text-lg font-medium transition-all duration-300"
                href="/shop"
                size="lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Shopping
              </Button>
            </motion.div>
            <motion.div variants={slideInRight}>
              <Button
                as={Link}
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-12 py-4 text-lg font-medium transition-all duration-300"
                href="/contact"
                size="lg"
                variant="bordered"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-16 pt-16 border-t border-foreground/10"
            variants={fadeInUp}
          >
            <div className="flex flex-wrap justify-center gap-12 text-foreground/60">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm uppercase tracking-wider">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm uppercase tracking-wider">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm uppercase tracking-wider">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm uppercase tracking-wider">Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </DefaultLayout>
  );
}