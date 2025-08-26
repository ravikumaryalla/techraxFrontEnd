import { getCartItems, getTotalAmount } from "../../redux/cartSlice";
import styles from "./cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductFromCart, changeQuantity } from "../../redux/cartThunk";
import { useEffect } from "react";

export default function CartPage() {
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     await dispatch(fetchCart());
  //   };
  //   fetchCartData();
  // }, []);
  const dispatch = useDispatch();
  const clearCart = () => {
    console.log("clear cart");
  };

  const handleDecrement = (id, quantity) => {
    if (quantity == 1) {
      dispatch(deleteProductFromCart(id));
    } else {
      dispatch(changeQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleIncrement = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity: quantity + 1 }));
  };
  const items = useSelector(getCartItems);
  const totalAmount = useSelector(getTotalAmount);
  console.log(totalAmount, "totalAmount");
  console.log(items, "cart");
  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptySubtitle}>
              Add some premium items to get started
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
          <h1 className={styles.title}>Shopping Cart</h1>
          <button onClick={clearCart} className={styles.clearButton}>
            Clear Cart
          </button>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {console.log(items, "item raja")}
            {items.map((item) => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img
                    src={item?.product?.images?.[0]?.url || "/placeholder.svg"}
                    alt={item.name}
                  />
                </div>

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.product.name}</h3>
                  <p className={styles.itemPrice}>${item?.product?.price}</p>
                </div>

                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleDecrement(item._id, item.quantity)}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item._id, item.quantity)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  ₹{item.product.price * item.quantity}
                </div>

                <button
                  onClick={() => dispatch(deleteProductFromCart(item._id))}
                  className={styles.removeButton}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{totalAmount}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>${Math.round(totalAmount * 0.08)}</span>
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>₹{totalAmount + Math.round(totalAmount * 0.08)}</span>
              </div>

              <a href="/checkout" className={styles.checkoutButton}>
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
