import { useState } from "react";
import styles from "./orders.module.css";
import { useEffect } from "react";
import { getOrders } from "../../service/orderService";
import { formatDate } from "date-fns/format";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "#10B981";
      case "shipped":
        return "#3B82F6";
      case "processing":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Orders</h1>
            <p className={styles.subtitle}>
              Track and manage your order history
            </p>
          </div>

          {orders.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📦</div>
              <h3 className={styles.emptyTitle}>No orders yet</h3>
              <p className={styles.emptyText}>
                Start shopping to see your orders here
              </p>
              <button className={styles.shopButton}>Start Shopping</button>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order?._id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <h3 className={styles.orderId}>Order {order._id}</h3>
                      <p className={styles.orderDate}>
                        Placed on {order.createdAt}
                      </p>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={styles.statusBadge}
                        style={{
                          backgroundColor: getStatusColor(order.orderStatus),
                        }}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    {order.orderItems.map((item) => (
                      <div key={item.product.id} className={styles.orderItem}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                        <div className={styles.itemDetails}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <p className={styles.itemQuantity}>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className={styles.itemPrice}>
                          ₹{item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.orderTotal}>
                      <span className={styles.totalLabel}>Total: </span>
                      <span className={styles.totalAmount}>
                        ₹{order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.orderActions}>
                      <button className={styles.trackButton}>
                        Track Order
                      </button>
                      <button className={styles.reorderButton}>Reorder</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
