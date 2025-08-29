import Hero from "../../components/Hero/Hero";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Newsletter from "../../components/Newsletter/Newsletter";
import Categories from "../../components/category/categories";

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
