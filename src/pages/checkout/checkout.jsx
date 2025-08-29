import { useState } from "react";
import styles from "./checkout.module.css";
import {
  getCartItems,
  getTotalAmount,
  getTotalQuantity,
} from "../../redux/cartSlice";
import { useSelector } from "react-redux";
import handleCheckout from "../../service/payment";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useSelector(getCartItems);
  const getTotalPrice = useSelector(getTotalAmount);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    country: "United States",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store checkout data in sessionStorage for payment page
    sessionStorage.setItem("checkoutData", JSON.stringify(formData));

    // Redirect to payment page
    handleCheckout(
      {
        shippingInfo: {
          ...formData,
        },
      },
      navigate
    );
    // window.location.href = "/payment";
  };

  const subtotal = getTotalPrice;
  const tax = Math.round(subtotal * 0.08);
  const shipping = 0;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.emptyCheckout}>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptySubtitle}>
              Add some items to proceed with checkout
            </p>
            <a href="/" className={styles.continueButton}>
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.steps}>
            <div className={`₹{styles.step} ₹{styles.stepActive}`}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Information</span>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Payment</span>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Confirmation</span>
            </div>
          </div>
        </div>

        <div className={styles.checkoutContent}>
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Contact Information</h3>

              <div className={styles.formGroup}>
                <div className={styles.contactInfo}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Shipping Address</h3>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Continue to Payment
            </button>
          </form>

          <div className={styles.orderSummary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.orderItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <img
                        src={
                          item?.product?.images?.[0]?.url || "/placeholder.svg"
                        }
                        alt={item?.product?.name}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item?.product?.name}</h4>
                      <p className={styles.itemQuantity}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className={styles.itemPrice}>
                      ₹{(item?.product?.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
