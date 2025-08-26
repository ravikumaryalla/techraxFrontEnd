import apiClient from "./apiClient";
export const getcart = async () => {
  const response = await apiClient.get("/cart");

  return response.data || [];
};

export const addProductToCart = async ({ userId, productId, quantity }) => {
  const response = await apiClient.post("/cart/add", {
    user: userId,
    product: productId,
    quantity,
  });
  return response.data;
};

export const removeProductFromCart = async (id) => {
  const response = await apiClient.delete(`/cart/${id}`);
  return response.data;
};

export const updateQuantity = async (id, quantity) => {
  const response = await apiClient.put(`/cart/${id}`, { quantity: quantity });
  return response.data;
};
