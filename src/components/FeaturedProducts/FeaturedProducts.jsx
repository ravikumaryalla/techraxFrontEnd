import { useState } from "react";
import styles from "./FeaturedProducts.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartThunk";
import { useEffect } from "react";
import apiClient from "../../service/apiClient";
export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    apiClient
      .get("/products?badges=Featured")
      .then((response) => {
        console.log(response, "response");
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            Handpicked selections from our premium collection
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img
                  src={product.images[0].url || "/placeholder.svg"}
                  alt={product.name}
                  className={styles.productImage}
                />
                {product?.badges.length > 1 && (
                  <div className={styles.badge}>{product.badges[1]}</div>
                )}
                <button
                  className={`${styles.favoriteButton} ${
                    favorites.includes(product._id) ? styles.favoriteActive : ""
                  }`}
                  onClick={() => toggleFavorite(product._id)}
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
                      fill={i < Math.floor(product.rating) ? "#6366f1" : "none"}
                      stroke="#6366f1"
                      strokeWidth="2"
                    >
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                  <span className={styles.ratingText}>({product.rating})</span>
                </div>

                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  className={styles.addToCartButton}
                  onClick={() =>
                    dispatch(
                      addToCart({
                        productId: product._id,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
