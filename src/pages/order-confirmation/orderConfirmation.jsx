import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./order-confirmation.module.css";
import { useLocation } from "react-router-dom";
import { addDays } from "date-fns/addDays";
import { format } from "date-fns/format";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const estimatedDelivery = format(
    addDays(state?.paidAt, 8),
    "EEEE, dd MMM yyyy"
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.confirmationCard}>
          <div className={styles.successIcon}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
          </div>

          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.subtitle}>
            Thank you for your purchase. Your order has been successfully placed
            and is being processed.
          </p>

          <div className={styles.orderDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Number:</span>
              <span className={styles.detailValue}>#{state?._id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Estimated Delivery:</span>
              <span className={styles.detailValue}>{estimatedDelivery}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment Status:</span>
              <span className={styles.statusBadge}>
                {state?.paymentInfo?.status}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order Status:</span>
              <span className={styles.statusBadge}>{state?.orderStatus}</span>
            </div>
          </div>

          <div className={styles.nextSteps}>
            <h3 className={styles.stepsTitle}>What happens next?</h3>
            <div className={styles.stepsList}>
              <div className={styles.step}>
                <div className={styles.stepIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2" />
                  </svg>
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Order Processing</h4>
                  <p className={styles.stepDescription}>
                    We're preparing your premium items with care
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <path d="m16 8 2 2-2 2" />
                    <path d="M21 12H18" />
                  </svg>
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Shipping Notification</h4>
                  <p className={styles.stepDescription}>
                    You'll receive tracking information via email
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                    <path d="M12 3v6" />
                  </svg>
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>Delivery</h4>
                  <p className={styles.stepDescription}>
                    Your order will arrive by {estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <a href="/" className={styles.primaryButton}>
              Continue Shopping
            </a>
            <button
              className={styles.secondaryButton}
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>

          <div className={styles.support}>
            <p className={styles.supportText}>
              Need help with your order? Contact our premium support team at{" "}
              <a
                href="mailto:support@techrax.in"
                className={styles.supportLink}
              >
                support@techrax.in
              </a>
            </p>
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Order Protection</h3>
            <p className={styles.infoText}>
              Your order is protected by our premium guarantee. If you're not
              completely satisfied, we offer free returns within 30 days.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Premium Packaging</h3>
            <p className={styles.infoText}>
              All items are carefully packaged in our signature luxury boxes
              with premium protective materials to ensure perfect delivery.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Exclusive Benefits</h3>
            <p className={styles.infoText}>
              As a valued customer, you now have access to exclusive previews,
              special offers, and priority customer support.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
