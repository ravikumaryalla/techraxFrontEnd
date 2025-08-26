import styles from "./Hero.module.css";
import heroImage from "../../assets/hero_banner.png";
import { getcart } from "../../service/cartService";
import { useEffect } from "react";
const Hero = () => {
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const res = await getcart();
  //     console.log(res);
  //     return res;
  //   };
  //   fetchCart();
  // }, []);

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
            <button className={styles.primaryButton}>Explore Collection</button>
            <button className={styles.secondaryButton}>
              Watch Story
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.gradientOrb}></div>
          <div className={styles.productShowcase}>
            <img
              src={heroImage}
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
