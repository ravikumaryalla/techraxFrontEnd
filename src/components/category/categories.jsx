import styles from "./categories.module.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Mobiles",
    description: "Latest flagship devices",
    image: "https://res.cloudinary.com/du3yydyzz/image/upload/mobiles.png",
    count: "45 items",
  },
  {
    id: 2,
    name: "Laptops",
    description: "High-performance computing",
    image: "https://res.cloudinary.com/du3yydyzz/image/upload/laptops.jpg",
    count: "32 items",
  },
  {
    id: 3,
    name: "Tablets",
    description: "Portable productivity",
    image: "https://res.cloudinary.com/du3yydyzz/image/upload/tablets.jpg",
    count: "28 items",
  },
  {
    id: 4,
    name: "Audio",
    description: "Premium sound experience",
    image: "https://res.cloudinary.com/du3yydyzz/image/upload/headphones.jpg",
    count: "38 items",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Curated Collections</h2>
          <p className={styles.subtitle}>
            Explore our carefully selected categories of premium products
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <a
                    onClick={() =>
                      navigate(`/products`, {
                        state: { category: category.name },
                      })
                    }
                    className={styles.exploreButton}
                  >
                    Explore
                  </a>
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.description}>{category.description}</p>
                <span className={styles.count}>{category.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
