import { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./signup.module.css";
import { fetchUser, registerThunk } from "../../redux/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../redux/cartThunk";
import { useGoogleLogin } from "@react-oauth/google";
import apiClient from "../../service/apiClient";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [acceptTerms, setAcceptTerms] = useState(false);

  const handleGoogleSignUp = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      console.log("tokenResponse", tokenResponse);
      let response = await apiClient.post("/google-signup", {
        code: tokenResponse?.code,
      });
      console.log("response in frontend auth", response);
      if (response?.data?.success) {
        dispatch(fetchUser());
        dispatch(fetchCart());
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleChange = (e) => {
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const errors = {};
    console.log("[v0] Validating form...");

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const response = await dispatch(registerThunk(formData));
    if (response?.meta.requestStatus === "fulfilled") {
      dispatch(fetchUser());
      dispatch(fetchCart());

      navigate("/");
    }
    setIsLoading(false);

    // if (!acceptTerms) {
    //   alert("Please accept the terms and conditions");
    //   return;
    // }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("[v0] Sign up attempted with:", formData);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Join LUXE</h1>
            <p className={styles.subtitle}>Create your premium account</p>
          </div>

          <button className={styles.googleButton} onClick={handleGoogleSignUp}>
            <svg
              className={styles.googleIcon}
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className={styles.divider}>
            <hr />
            <span>or</span>
            <hr />
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.nameRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="John"
                  // required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Doe"
                  // required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="john@example.com"
                // required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Create a strong password"
                // required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="Confirm your password"
                // required
              />
            </div>
            {errors && (
              <p className={styles.error}>{errors[Object.keys(errors)[0]]}</p>
            )}

            {/* <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span className={styles.checkmark}></span>I agree to the{" "}
              <a href="#" className={styles.link}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>
            </label> */}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* <p className={styles.switchAuth}>
            Already have an account?{" "}
            <a href="/signin" className={styles.link}>
              Sign in
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default SignUp;
