"use client"

import { useState } from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import styles from "./orders.module.css"

interface Order {
  id: string
  date: string
  status: "delivered" | "shipped" | "processing" | "cancelled"
  total: number
  items: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
}

// Mock order data - in a real app, this would come from an API
const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        image: "/premium-wireless-headphones.png",
        price: 299.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    status: "shipped",
    total: 149.98,
    items: [
      {
        id: "2",
        name: "Smart Fitness Watch",
        image: "/smart-fitness-watch.png",
        price: 149.98,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    status: "processing",
    total: 89.99,
    items: [
      {
        id: "3",
        name: "Bluetooth Speaker",
        image: "/bluetooth-speaker.png",
        price: 89.99,
        quantity: 1,
      },
    ],
  },
]

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "#10B981"
      case "shipped":
        return "#3B82F6"
      case "processing":
        return "#F59E0B"
      case "cancelled":
        return "#EF4444"
      default:
        return "#6B7280"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Orders</h1>
            <p className={styles.subtitle}>Track and manage your order history</p>
          </div>

          {orders.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📦</div>
              <h3 className={styles.emptyTitle}>No orders yet</h3>
              <p className={styles.emptyText}>Start shopping to see your orders here</p>
              <button className={styles.shopButton}>Start Shopping</button>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <h3 className={styles.orderId}>Order {order.id}</h3>
                      <p className={styles.orderDate}>Placed on {formatDate(order.date)}</p>
                    </div>
                    <div className={styles.orderStatus}>
                      <span className={styles.statusBadge} style={{ backgroundColor: getStatusColor(order.status) }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
                        </div>
                        <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.orderTotal}>
                      <span className={styles.totalLabel}>Total: </span>
                      <span className={styles.totalAmount}>${order.total.toFixed(2)}</span>
                    </div>
                    <div className={styles.orderActions}>
                      <button className={styles.trackButton}>Track Order</button>
                      <button className={styles.reorderButton}>Reorder</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
