import apiClient from "./apiClient";

export const getAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data.products;
};

export const getProductsByCategory = async (category) => {
  if (!category) return getAllProducts();
  const response = await apiClient.get(`/products?categeory=${category}`);
  return response.data.products;
};
