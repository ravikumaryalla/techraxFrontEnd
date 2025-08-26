import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
};

export default Home;
