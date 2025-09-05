// src/pages/ProductDetails.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../contexts/productContext";
import DefaultLayout from "../layouts/default";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Skeleton,
  Image,
} from "@heroui/react";

const ProductImageGallery = ({ product, selectedImage, setSelectedImage }) => {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardBody className="p-0 relative">
          <Image
            src={product.gallery?.[selectedImage] || product.image}
            alt={product.name}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
            classNames={{ wrapper: "w-full" }}
          />
          {product.badge && (
            <Chip
              color="danger"
              className="absolute top-3 left-3 sm:top-4 sm:left-4"
            >
              {product.badge}
            </Chip>
          )}
          {discountPercentage > 0 && (
            <Chip
              color="warning"
              className="absolute top-3 right-3 sm:top-4 sm:right-4"
            >
              -{discountPercentage}%
            </Chip>
          )}
        </CardBody>
      </Card>
      {product.gallery && product.gallery.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {product.gallery.map((img, index) => (
            <Button
              key={index}
              variant={selectedImage === index ? "solid" : "flat"}
              isIconOnly
              onPress={() => setSelectedImage(index)}
              className="w-full h-16 sm:h-20 p-1"
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductInfo = ({ product }) => {
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "text-warning" : "text-default-300"}
      >
        ★
      </span>
    ));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Chip color="secondary" variant="flat" className="mb-2">
          {product.category}
        </Chip>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {product.name}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex">{renderStars(product.rating)}</div>
        <span className="text-foreground-500 text-sm">
          {product.rating} ({product.reviews?.length || 0} reviews)
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-bold text-success">
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className="text-lg sm:text-xl line-through text-foreground-400">
            ${product.originalPrice}
          </span>
        )}
      </div>
      <Chip
        color={product.inStock ? "success" : "danger"}
        variant="flat"
        startContent={
          <div
            className={`w-2 h-2 rounded-full ${product.inStock ? "bg-success" : "bg-danger"}`}
          />
        }
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </Chip>
    </div>
  );
};

const ProductActions = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("1");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product, quantity: parseInt(quantity) } });
  };

  const subtotal = (product.price * parseInt(quantity)).toFixed(2);

  return (
    <Card>
      <CardBody className="space-y-6">
        {product.inStock && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Select
                label="Quantity"
                placeholder="Select quantity"
                selectedKeys={[quantity]}
                onSelectionChange={(keys) => setQuantity([...keys][0])}
                className="max-w-[150px]"
                classNames={{
                  trigger: "min-h-12",
                  value: "text-base",
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <SelectItem
                    key={(i + 1).toString()}
                    value={(i + 1).toString()}
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex flex-col items-end">
                <span className="text-sm text-foreground-500">Subtotal:</span>
                <span className="text-xl font-bold text-foreground">
                  ${subtotal}
                </span>
              </div>
            </div>

            {parseInt(quantity) > 1 && (
              <div className="flex items-center justify-between p-3 bg-content2/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Unit price:</span>
                  <span className="font-medium">${product.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">×</span>
                  <Chip
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="min-w-[40px] justify-center"
                  >
                    {quantity}
                  </Chip>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            color="secondary"
            variant="solid"
            size="lg"
            className="flex-1 h-16 sm:h-14 text-xl sm:text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white py-4"
            onPress={handleAddToCart}
            isDisabled={!product.inStock}
            startContent={
              <div className="flex items-center gap-2">
                {addedToCart ? "✓" : ""}
                {parseInt(quantity) > 1 && (
                  <Chip
                    size="sm"
                    variant="flat"
                    className="bg-white/20 border-white/30"
                  >
                    ×{quantity}
                  </Chip>
                )}
              </div>
            }
          >
            {addedToCart ? "Added!" : "Add to Cart"}
          </Button>
          <Button
            color="primary"
            size="lg"
           className="flex-1 h-16 sm:h-14 text-xl sm:text-lg font-semibold py-4"
            onPress={handleBuyNow}
            isDisabled={!product.inStock}
            startContent={
              <div className="flex items-center gap-2">
                
                {parseInt(quantity) > 1 && (
                  <Chip
                    size="sm"
                    variant="flat"
                    className="bg-white/20 border-white/30"
                  >
                    ×{quantity}
                  </Chip>
                )}
              </div>
            }
          >
            Buy Now
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
const ProductDetailsTabs = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState("description");

  return (
    <Card>
      <CardBody>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          variant="underlined"
          aria-label="Product Details"
        >
          <Tab key="description" title="Description">
            <p className="pt-4 text-foreground-600">{product.description}</p>
          </Tab>
          <Tab key="specifications" title="Specifications">
            <div className="pt-4 space-y-3">
              {product.specs?.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-content2 rounded-lg"
                >
                  <span className="font-medium">{spec.label}</span>
                  <span className="text-foreground-600">{spec.value}</span>
                </div>
              )) || <p>No specifications available.</p>}
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl" />
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-16 sm:h-20 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

// --- Main Product Details Page Component ---

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products?.find((p) => p.id === parseInt(id, 10));

  if (loading) {
    return (
      <DefaultLayout>
        <LoadingSkeleton />
      </DefaultLayout>
    );
  }

  if (!product) {
    return (
      <DefaultLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardBody className="p-8">
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <p className="text-foreground-500 mb-6">
                We couldn't find a product with the ID "{id}".
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="bordered" onClick={() => navigate(-1)}>
                  ← Go Back
                </Button>
                <Button color="primary" as={Link} to="/project-VELORA/shop">
                  Browse Products
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem>
            <Link to="/project-VELORA/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/project-VELORA/shop">Shop</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{product.name}</BreadcrumbItem>
        </Breadcrumbs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8">
          <ProductImageGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <div className="flex flex-col gap-6">
            <ProductInfo product={product} />
            <ProductActions product={product} />
          </div>
        </div>

        <ProductDetailsTabs product={product} />
      </div>
    </DefaultLayout>
  );
}
