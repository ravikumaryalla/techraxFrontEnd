import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./productspage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProductsByCategory } from "../../service/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartThunk";

// Mock product data - in a real app, this would come from an API
const allProducts = {
  smartphones: [
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
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 1099,
      originalPrice: 1199,
      image: "/samsung-galaxy-s24-ultra-premium-phone.png",
      badge: "New Arrival",
      rating: 4.8,
      category: "smartphones",
      brand: "Samsung",
      specs: ["512GB", "S Pen", "200MP Camera"],
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      price: 899,
      originalPrice: null,
      image: "/google-pixel-8-pro-smartphone.png",
      badge: "AI Powered",
      rating: 4.7,
      category: "smartphones",
      brand: "Google",
      specs: ["128GB", "Pure Android", "Magic Eraser"],
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: 799,
      originalPrice: 899,
      image: "/oneplus-12-flagship-smartphone.png",
      badge: "Fast Charging",
      rating: 4.6,
      category: "smartphones",
      brand: "OnePlus",
      specs: ["256GB", "100W Charging", "Hasselblad Camera"],
    },
  ],
  laptops: [
    {
      id: 5,
      name: "MacBook Pro 16-inch",
      price: 2499,
      originalPrice: null,
      image: "/macbook-pro-16-inch-premium-laptop.png",
      badge: "Best Seller",
      rating: 5.0,
      category: "laptops",
      brand: "Apple",
      specs: ["M3 Pro", "32GB RAM", "1TB SSD"],
    },
    {
      id: 6,
      name: "Dell XPS 15",
      price: 1899,
      originalPrice: 2099,
      image: "/dell-xps-15-premium-laptop.png",
      badge: "Creator Edition",
      rating: 4.8,
      category: "laptops",
      brand: "Dell",
      specs: ["Intel i9", "32GB RAM", "RTX 4070"],
    },
    {
      id: 7,
      name: "ThinkPad X1 Carbon",
      price: 1699,
      originalPrice: null,
      image: "/lenovo-thinkpad-x1-carbon-business-laptop.png",
      badge: "Business",
      rating: 4.7,
      category: "laptops",
      brand: "Lenovo",
      specs: ["Intel i7", "16GB RAM", "Carbon Fiber"],
    },
    {
      id: 8,
      name: "ASUS ROG Zephyrus",
      price: 2299,
      originalPrice: 2499,
      image: "/asus-rog-zephyrus-gaming-laptop.png",
      badge: "Gaming",
      rating: 4.9,
      category: "laptops",
      brand: "ASUS",
      specs: ["RTX 4080", "32GB RAM", "240Hz Display"],
    },
  ],
  tablets: [
    {
      id: 9,
      name: "iPad Pro 12.9-inch",
      price: 1099,
      originalPrice: null,
      image: "/ipad-pro-12-9-inch-premium-tablet.png",
      badge: "Pro Series",
      rating: 4.9,
      category: "tablets",
      brand: "Apple",
      specs: ["M2 Chip", "256GB", "Liquid Retina"],
    },
    {
      id: 10,
      name: "Samsung Galaxy Tab S9 Ultra",
      price: 999,
      originalPrice: 1199,
      image: "/samsung-galaxy-tab-s9-ultra-tablet.png",
      badge: "Ultra Wide",
      rating: 4.7,
      category: "tablets",
      brand: "Samsung",
      specs: ["14.6 inch", "S Pen", "12GB RAM"],
    },
    {
      id: 11,
      name: "Microsoft Surface Pro 9",
      price: 899,
      originalPrice: null,
      image: "/microsoft-surface-pro-9-tablet.png",
      badge: "2-in-1",
      rating: 4.6,
      category: "tablets",
      brand: "Microsoft",
      specs: ["Intel i7", "Type Cover", "Surface Pen"],
    },
  ],
  audio: [
    {
      id: 12,
      name: "AirPods Pro 2nd Gen",
      price: 249,
      originalPrice: 279,
      image: "/images/products/airpods-pro.png",
      badge: "Noise Cancelling",
      rating: 4.8,
      category: "audio",
      brand: "Apple",
      specs: ["Active ANC", "Spatial Audio", "MagSafe Case"],
    },
    {
      id: 13,
      name: "Sony WH-1000XM5",
      price: 399,
      originalPrice: null,
      image: "/sony-wh-1000xm5-premium-headphones.png",
      badge: "Premium",
      rating: 4.9,
      category: "audio",
      brand: "Sony",
      specs: ["30hr Battery", "Hi-Res Audio", "Touch Controls"],
    },
    {
      id: 14,
      name: "Bose QuietComfort Ultra",
      price: 429,
      originalPrice: 449,
      image: "/bose-quietcomfort-ultra-headphones.png",
      badge: "Ultra Quiet",
      rating: 4.7,
      category: "audio",
      brand: "Bose",
      specs: ["World-class ANC", "24hr Battery", "Immersive Audio"],
    },
  ],
};

const categoryInfo = {
  smartphones: {
    title: "Smartphones",
    description:
      "Discover the latest flagship smartphones with cutting-edge technology",
    totalItems: 45,
  },
  laptops: {
    title: "Laptops",
    description: "High-performance laptops for work, creativity, and gaming",
    totalItems: 32,
  },
  tablets: {
    title: "Tablets",
    description: "Portable productivity and entertainment devices",
    totalItems: 28,
  },
  audio: {
    title: "Audio",
    description: "Premium headphones and speakers for exceptional sound",
    totalItems: 38,
  },
};

export default function Productspage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");
  const [products, setProducts] = useState([]);

  const category = state?.category;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByCategory(state?.category);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const brands = useMemo(() => {
    console.log(products, "products in brands");
    return [...new Set(products.map((p) => p.brand))];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (filterBy !== "all") {
      filtered = filtered.filter((product) => product.brand === filterBy);
    }

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [products, sortBy, filterBy]);

  const toggleFavorite = (e, productId) => {
    e.stopPropagation();

    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    console.log("favorites", favorites);
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    console.log(product, "product");
    const payload = { productId: product._id, quantity: 1 };
    await dispatch(addToCart(payload));
  };

  if (!category && location.pathname !== "/allproducts") {
    return (
      <div className={styles.notFound}>
        <div className={styles.container}>
          <h1>Category not found</h1>
          <p>The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.categoryHeader}>
            <div className={styles.breadcrumb}>
              <a href="/" className={styles.breadcrumbLink}>
                Home
              </a>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>
                {category || "All Products"}
              </span>
            </div>

            <h1 className={styles.categoryTitle}>
              {category || "All Products"}
            </h1>
            <p className={styles.categoryDescription}>
              {category?.description}
            </p>
            <div className={styles.categoryStats}>
              <span className={styles.totalItems}>
                {products?.length || 0} items available
              </span>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.filters}>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.sorting}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <div className={styles.resultsCount}>
              {filteredAndSortedProducts.length} products
            </div>
          </div>

          <div className={styles.productsGrid}>
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product._id}
                className={styles.productCard}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={product.images[0].url || "/placeholder.svg"}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  {product?.badges && product.badges.length > 0 && (
                    <div className={styles.badge}>
                      {
                        product.badges[
                          Math.floor(Math.random() * product.badges.length)
                        ]
                      }
                    </div>
                  )}
                  <button
                    className={`${styles.favoriteButton} ${
                      favorites.includes(product._id)
                        ? styles.favoriteActive
                        : ""
                    }`}
                    onClick={(e) => toggleFavorite(e, product._id)}
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

                <div className={styles.productInfo}>
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

                  <a
                    href={`/product/${product.id}`}
                    className={styles.productNameLink}
                  >
                    <h3 className={styles.productName}>{product.name}</h3>
                  </a>

                  <div className={styles.specs}>
                    {product.specs.map((spec, index) => (
                      <span key={index} className={styles.spec}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    className={styles.addToCartButton}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className={styles.noResults}>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
