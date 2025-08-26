"use client"

import type React from "react"

import { useState } from "react"
import styles from "./Newsletter.module.css"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Stay in the Loop</h2>
          <p className={styles.subtitle}>
            Be the first to know about exclusive launches, premium collections, and special offers.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.subscribeButton}>
                  Subscribe
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
              <span>Thank you for subscribing!</span>
            </div>
          )}

          <p className={styles.disclaimer}>We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
