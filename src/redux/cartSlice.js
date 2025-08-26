import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addToCart,
  deleteProductFromCart,
  changeQuantity,
} from "./cartThunk";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.totalQuantity += action.payload.quantity || 1;
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalQuantity -= action.payload.quantity;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.cart;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //Add to cart
    builder

      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action, "action from cart");
        console.log(state.items, "state items");
        state.items.push(action.payload.cart);
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      });

    //Remove from cart
    builder
      .addCase(deleteProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        console.log(action, "action freom cart");
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //update quantity
    builder
      .addCase(changeQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        let index = state.items.findIndex(
          (item) => item._id === action.payload.id
        );
        state.items[index].quantity = action.payload.quantity;

        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(changeQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getCartItems = (state) => state.cart.items;
export const getTotalQuantity = (state) => state.cart.totalQuantity;
export const getTotalAmount = (state) => {
  return state.cart.totalPrice;
};

export default cartSlice.reducer;

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
