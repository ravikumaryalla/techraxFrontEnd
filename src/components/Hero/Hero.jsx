import styles from "./Hero.module.css";
const Hero = () => {
  const handleScroll = () => {
    const section = document.getElementById("categories");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            crafted for the
            <br />
            <span className={styles.highlight}>extraordinary</span>
          </h1>
          <p className={styles.subtitle}>
            Discover premium products that redefine luxury.
            <br />
            Curated exclusively for those who demand excellence.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={handleScroll}>
              Explore Collection
            </button>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.gradientOrb}></div>
          <div className={styles.productShowcase}>
            <img
              src={`https://res.cloudinary.com/du3yydyzz/image/upload/hero_banner_tsqls5.png`}
              alt="Premium Product"
              className={styles.productImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
