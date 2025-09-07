import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import DefaultLayout from "../layouts/default"; // Adjust path as needed

const NotFoundPage = () => {
  return (
    <DefaultLayout>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Elegant 404 Display */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[12rem] md:text-[16rem] font-light text-foreground/5 select-none leading-none">
                404
              </div>
            </div>
            <div className="relative z-10 pt-16 md:pt-24">
              <div className="inline-block">
                <h1 className="text-6xl md:text-8xl font-extralight text-foreground/80 mb-2 tracking-wider">
                  4<span className="text-primary">0</span>4
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Sophisticated VELORA Branding */}
          {/* Sophisticated VELORA Branding */}
          <Card className="mb-12 border border-foreground/10 bg-background/40 backdrop-blur-md mx-auto max-w-2xl">
            <CardBody className="relative py-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
              <div className="relative">
                <div className="text-5xl md:text-7xl font-light text-foreground tracking-[0.2em] mb-4">
                  VELORA
                </div>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/30"></div>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/30"></div>
                </div>
                <p className="text-foreground/60 text-lg font-light italic">
                  Where elegance meets functionality
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Refined Error Message */}
          <div className="mb-12 space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide">
              Page Not Found
            </h2>
            <p className="text-foreground/70 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              The page you're seeking has wandered beyond our reach. Allow us to
              guide you back to our curated collection.
            </p>
          </div>

          {/* Elegant Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              as={Link}
              to="/"
              color="primary"
              size="lg"
              className="font-medium px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Return Home
            </Button>

            <Button
              as={Link}
              to="/shop"
              variant="bordered"
              size="lg"
              className="font-medium px-8 py-4 backdrop-blur-sm border-2 hover:bg-primary/5 transition-all duration-300"
            >
              Explore Collection
            </Button>
          </div>

          {/* Sophisticated Loading Animation */}
          <div className="flex justify-center items-center space-x-3">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-8 bg-gradient-to-t from-primary/30 to-primary rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-4 h-4 border border-primary/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/3 left-10 w-3 h-3 bg-primary/40 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 border border-foreground/20 rotate-45 animate-pulse"></div>
      </div>
    </DefaultLayout>
  );
};

export default NotFoundPage;
