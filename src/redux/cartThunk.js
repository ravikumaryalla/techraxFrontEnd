import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getcart,
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
} from "../service/cartService";

const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const cart = await getcart();
  return cart;
});

const addToCart = createAsyncThunk("cart/addToCart", async (payload) => {
  const { userId, productId, quantity } = payload;
  const cart = await addProductToCart({ userId, productId, quantity });
  return cart;
});

const deleteProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (id) => {
    const cart = await removeProductFromCart(id);
    return { ...cart, id };
  }
);

const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async (payload) => {
    console.log(payload, "payload");
    const { id, quantity } = payload;

    const cart = await updateQuantity(id, quantity);
    return { ...cart, id, quantity };
  }
);

export { fetchCart, addToCart, deleteProductFromCart, changeQuantity };
