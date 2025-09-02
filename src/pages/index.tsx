import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import BentoGrid from "@/components/bentoGrid"; // Make sure this points to your TypeScript version
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
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
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <video
                autoPlay
                muted
                loop
                className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
              >
                <source
                  src={`${import.meta.env.BASE_URL}Minimalist_Logo_Animation_Generation.mp4`} 
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                VELORA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Discover premium products crafted for the modern lifestyle. Where
              elegance meets functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                as={Link}
                className="bg-foreground text-background hover:opacity-80 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
                href="/products"
                size="lg"
              >
                Shop Collection
              </Button>
              <Button
                as={Link}
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 text-lg font-medium transition-all duration-300"
                href="/about"
                size="lg"
                variant="bordered"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-foreground/50">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50k+</div>
                <div className="text-sm text-foreground/50">Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-foreground/50">Rating</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* BentoGrid Section - Now properly positioned */}
        <div className="w-full mt-20">
          <BentoGrid />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Shop by Category
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections designed for every
              aspect of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-foreground"
                isPressable
              >
                <CardBody className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-foreground rounded-full flex items-center justify-center group-hover:opacity-80 transition-colors">
                    <div className="w-6 h-6 bg-background rounded" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-foreground/50">{category.count}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-default-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Featured Products
            </h2>
            <p className="text-foreground/70 text-lg">
              Handpicked items that define quality and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                isPressable
              >
                <CardBody className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={product.image}
                    />
                  </div>
                </CardBody>
                <CardFooter className="flex flex-col items-start p-4">
                  <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-foreground/60 transition-colors text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-foreground">
                    {product.price}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              as={Link}
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 font-medium transition-all duration-300"
              href="/products"
              size="lg"
              variant="bordered"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive offers, and style
            tips.
          </p>

          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              className="flex-1"
              classNames={{
                input: "text-foreground placeholder:text-foreground/40",
                inputWrapper:
                  "bg-background/10 border-background/20 hover:bg-background/20 focus-within:bg-background/20",
              }}
              placeholder="Enter your email"
              type="email"
            />
            <Button className="bg-background text-foreground hover:bg-background/90 font-medium px-8 transition-colors">
              Subscribe
            </Button>
          </div>

          <p className="text-background/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-foreground rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-background rounded" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Premium Quality
              </h3>
              <p className="text-foreground/70">
                Every product is carefully selected and tested for the highest
                standards.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-foreground rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-background rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Fast Shipping
              </h3>
              <p className="text-foreground/70">
                Free shipping on orders over $100. Express delivery available.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-foreground rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-background rounded-sm" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Easy Returns
              </h3>
              <p className="text-foreground/70">
                30-day return policy. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}