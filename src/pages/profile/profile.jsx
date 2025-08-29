import { useState } from "react";
import styles from "./profile.module.css";
import { getUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns/format";

export default function Profile() {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2024",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords do not match");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setMessage("Password changed successfully!");
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <span>
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            </div>
            <div className={styles.userInfo}>
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <p className={styles.email}>{user.email}</p>
              <p className={styles.joinDate}>
                Member since {format(user.createdAt, "MMMM yyyy")}
              </p>
            </div>
          </div>

          {message && <div className={styles.message}>{message}</div>}

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Personal Information</h2>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={userInfo.firstName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstName: e.target.value })
                    }
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={userInfo.lastName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastName: e.target.value })
                    }
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className={styles.input}
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              )}
            </form>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Security</h2>
              <button
                className={styles.editButton}
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change Password
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handleChangePassword} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className={styles.input}
                    required
                    minLength={8}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={styles.input}
                    required
                    minLength={8}
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className={styles.section}>
            <h2>Quick Actions</h2>
            <div className={styles.actionButtons}>
              <a
                className={styles.actionButton}
                onClick={() => navigate("/myorders")}
              >
                View Orders
              </a>
              <a
                className={styles.actionButton}
                onClick={() => navigate("/cart")}
              >
                View Cart
              </a>
              <a className={styles.actionButton} onClick={() => navigate("/")}>
                Reset Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
