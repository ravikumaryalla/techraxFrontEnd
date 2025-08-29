import apiClient from "./apiClient";
const key = import.meta.env.VITE_RAZORPAY_KEY;

const handleCheckout = async (payload, navigate) => {
  const { data } = await apiClient.post("/orders/new", payload);
  const options = {
    key,
    amount: data.razorPayOrder.amount,
    currency: "INR",
    name: "TECHRAX",
    description: "Test Transaction",
    order_id: data.razorPayOrder.id,
    handler: async function (response) {
      const verifyRes = await apiClient.post(
        "/orders/verify-payment",
        response
      );
      if (verifyRes.data.success) {
        navigate("/order-confirmation", { state: verifyRes?.data?.order });
      } else {
        alert("Payment Verification Failed");
      }
    },

    theme: { color: "#0a0a0a" },
  };
  const razor = new window.Razorpay(options);
  razor.on("payment.failed", function (response) {
    // response.error has code, description, source, step, reason, metadata
    alert("Payment failed: " + response.error.description);
  });
  razor.open();
};

export default handleCheckout;
