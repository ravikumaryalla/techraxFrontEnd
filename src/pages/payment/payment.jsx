import { useState, useEffect } from "react";
import styles from "./payment.module.css";

export default function PaymentPage() {
  const { items, getTotalPrice, clearCart } = {
    items: [],
    getTotalPrice: () => 0,
    clearCart: () => {},
  };
  const [checkoutData, setCheckoutData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get checkout data from sessionStorage
    const storedData = sessionStorage.getItem("checkoutData");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      // Redirect back to checkout if no data
      window.location.href = "/checkout";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store complete order data for confirmation page
    const orderData = {
      ...checkoutData,
      ...paymentData,
      items,
      orderNumber: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
    };
    sessionStorage.setItem("orderData", JSON.stringify(orderData));

    // Clear cart and redirect to confirmation
    clearCart();
    window.location.href = "/order-confirmation";
  };

  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.08);
  const shipping = 0;
  const total = subtotal + tax + shipping;

  if (!checkoutData) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Payment</h1>
          <div className={styles.steps}>
            <div className={`${styles.step} ${styles.stepCompleted}`}>
              <span className={styles.stepNumber}>✓</span>
              <span className={styles.stepLabel}>Information</span>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={`${styles.step} ${styles.stepActive}`}>
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

        <div className={styles.paymentContent}>
          <form onSubmit={handleSubmit} className={styles.paymentForm}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Shipping Details</h3>
              <div className={styles.shippingInfo}>
                <p>
                  {checkoutData.firstName} {checkoutData.lastName}
                </p>
                <p>{checkoutData.email}</p>
                <p>{checkoutData.address}</p>
                <p>
                  {checkoutData.city}, {checkoutData.state}{" "}
                  {checkoutData.zipCode}
                </p>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={() => (window.location.href = "/checkout")}
                >
                  Edit
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Payment Information</h3>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on card"
                  value={paymentData.nameOnCard}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className={styles.spinner}></div>
                  Processing...
                </>
              ) : (
                `Complete Order - $${total.toLocaleString()}`
              )}
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
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemQuantity}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className={styles.itemPrice}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${tax.toLocaleString()}</span>
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
