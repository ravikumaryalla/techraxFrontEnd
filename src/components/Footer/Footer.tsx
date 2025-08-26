"use client"

import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>LUXE</h3>
            <p className={styles.description}>
              Crafting extraordinary experiences through premium products and exceptional service.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Press
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 LUXE. All rights reserved.</p>
          <div className={styles.payment}>
            <span className={styles.paymentText}>We accept</span>
            <div className={styles.paymentMethods}>
              <div className={styles.paymentCard}>VISA</div>
              <div className={styles.paymentCard}>MC</div>
              <div className={styles.paymentCard}>AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
