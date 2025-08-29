import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { SignIn } from "./pages/signIn/signIn";
import Home from "./pages/home/home";
import styles from "./App.module.css";
import SignUp from "./pages/signup/signUp";
import CartPage from "./pages/cart/cart";
import CheckoutPage from "./pages/checkout/checkout";
import PaymentPage from "./pages/payment/payment";
import ScrollToTop from "./utils/scrollToTop";
import OrderConfirmation from "./pages/order-confirmation/orderConfirmation";
import Orders from "./pages/orders/orders";
import Profile from "./pages/profile/profile";
import Productspage from "./pages/productspage/productspage";
import ProductDetailPage from "./pages/product/product";
export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/myorders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Productspage />} />
        <Route path="/allproducts" element={<Productspage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
