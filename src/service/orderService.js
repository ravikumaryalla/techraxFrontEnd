import apiClient from "./apiClient";

export const getOrders = async () => {
  const response = await apiClient.get("/orders/me");
  return response.data.orders;
};
