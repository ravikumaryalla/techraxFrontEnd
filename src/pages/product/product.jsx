import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./product.module.css";
import apiClient from "../../service/apiClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartThunk";

// Mock product data - in a real app, this would come from an API
const allProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "/iphone-15-pro-max-premium-smartphone.png",
    badge: "Latest Model",
    rating: 4.9,
    category: "smartphones",
    brand: "Apple",
    specs: ["256GB", "Titanium", "Pro Camera"],
    description:
      "The most advanced iPhone ever, featuring the powerful A17 Pro chip, titanium design, and revolutionary camera system with 5x telephoto zoom.",
    features: [
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP main camera",
      "5x telephoto zoom",
      "Titanium design with textured matte glass back",
      "Action Button for quick shortcuts",
      "USB-C connectivity",
      "Up to 29 hours video playback",
    ],
    gallery: [
      "/iphone-15-pro-max-premium-smartphone.png",
      "/iphone-15-pro-max-back-view.png",
      "/iphone-15-pro-max-side-view.png",
      "/iphone-15-pro-max-camera-detail.png",
    ],
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    price: 2499,
    originalPrice: null,
    image: "/macbook-pro-16-inch-premium-laptop.png",
    badge: "Best Seller",
    rating: 5.0,
    category: "laptops",
    brand: "Apple",
    specs: ["M3 Pro", "32GB RAM", "1TB SSD"],
    description:
      "The ultimate pro laptop with M3 Pro chip, stunning Liquid Retina XDR display, and all-day battery life for the most demanding workflows.",
    features: [
      "M3 Pro chip with 12-core CPU and 18-core GPU",
      "32GB unified memory",
      "1TB SSD storage",
      "16.2-inch Liquid Retina XDR display",
      "1080p FaceTime HD camera",
      "Six-speaker sound system with force-cancelling woofers",
      "Up to 22 hours battery life",
    ],
    gallery: [
      "/macbook-pro-16-inch-premium-laptop.png",
      "/macbook-pro-16-inch-open-view.png",
      "/macbook-pro-16-inch-side-profile.png",
      "/macbook-pro-16-inch-keyboard-detail.png",
    ],
  },
  // Add more products as needed...
];

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const naigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const id = params?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        const data = await response.data.product;
        console.log("data", data, response, "response");
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Product not found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <a href="/" className={styles.backButton}>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <a href="/" className={styles.breadcrumbLink}>
              Home
            </a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <a
              onClick={() =>
                naigate("/products", { state: { category: product.categeory } })
              }
              className={styles.breadcrumbLink}
            >
              {product.categeory.charAt(0).toUpperCase() +
                product.categeory.slice(1)}
            </a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </div>

          <div className={styles.productDetail}>
            <div className={styles.imageSection}>
              <div className={styles.mainImage}>
                {console.log(product.images?.[selectedImage], "selectedImages")}
                <img
                  src={
                    product.images[selectedImage].url || product.images[0]?.url
                  }
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.badge}>{product.badge}</div>
              </div>

              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${
                      selectedImage === index ? styles.thumbnailActive : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.productHeader}>
                <div className={styles.brandRating}>
                  <span className={styles.brand}>{product.brand}</span>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={
                          i < Math.floor(product.ratings) ? "#6366f1" : "none"
                        }
                        stroke="#6366f1"
                        strokeWidth="2"
                      >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                    <span className={styles.ratingText}>
                      ({product.ratings})
                    </span>
                  </div>
                </div>

                <h1 className={styles.productName}>{product.name}</h1>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className={styles.specs}>
                  <h3 className={styles.specsTitle}>Key Specifications</h3>
                  <div className={styles.specsList}>
                    {product.specs.map((spec, index) => (
                      <span key={index} className={styles.spec}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className={`${styles.favoriteButton} ${
                      isFavorite ? styles.favoriteActive : ""
                    }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.features}>
                <h3 className={styles.featuresTitle}>Features & Benefits</h3>
                <ul className={styles.featuresList}>
                  {product.features.map((feature, index) => (
                    <li key={index} className={styles.feature}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
