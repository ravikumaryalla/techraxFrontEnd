"use client"

import styles from "./Categories.module.css"

const categories = [
  {
    id: 1,
    name: "Premium Watches",
    description: "Timeless elegance",
    image: "/placeholder-sp6dr.png",
    count: "24 items",
  },
  {
    id: 2,
    name: "Designer Bags",
    description: "Crafted perfection",
    image: "/luxury-handbags.png",
    count: "18 items",
  },
  {
    id: 3,
    name: "Fine Jewelry",
    description: "Precious moments",
    image: "/placeholder-8teab.png",
    count: "32 items",
  },
  {
    id: 4,
    name: "Luxury Tech",
    description: "Innovation meets style",
    image: "/placeholder-fqwcq.png",
    count: "12 items",
  },
]

export default function Categories() {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Curated Collections</h2>
          <p className={styles.subtitle}>Explore our carefully selected categories of premium products</p>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={category.image || "/placeholder.svg"} alt={category.name} className={styles.image} />
                <div className={styles.overlay}>
                  <button className={styles.exploreButton}>Explore</button>
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
  )
}
