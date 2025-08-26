import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import Categories from "./components/Categories/Categories";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import { SignIn } from "./pages/signIn/signIn";
import Hero from "./components/Hero/Hero";
import Home from "./pages/home/home";
import styles from "./App.module.css";
import SignUp from "./pages/signup/signUp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/cartThunk";
import CartPage from "./pages/cart/cart";
import { fetchUser } from "./redux/authThunk";
import CheckoutPage from "./pages/checkout/checkout";
import PaymentPage from "./pages/payment/payment";
export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
