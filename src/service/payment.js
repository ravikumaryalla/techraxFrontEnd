import apiClient from "./apiClient";
const key = import.meta.env.VITE_RAZORPAY_KEY;

const handleCheckout = async (payload) => {
  const { data } = await apiClient.post("/orders/new", payload);
  console.log(data, "razorPayOrder");
  const options = {
    key,
    amount: data.razorPayOrder.amount,
    currency: "INR",
    name: "My E-commerce",
    description: "Test Transaction",
    order_id: data.razorPayOrder.id,
    handler: async function (response) {
      const verifyRes = await axios.post(
        "http://localhost:3000/api/payment/verify-payment",
        response
      );
      if (verifyRes.data.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Verification Failed");
      }
    },

    theme: { color: "#0a0a0a" },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};

export default handleCheckout;
