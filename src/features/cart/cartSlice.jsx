import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log("state", state.value);
      // console.log("in slice payload ", action.payload);
      let product_already = 0;
      let cart = [...state.value];
      let obj = action.payload;
      for (let car of cart) {
        if (car.product == obj.product) {
          product_already = 1;
          car.quantity = obj.quantity;
        }
      }

      if (!product_already) {
        state.value.push(obj);
      }

      if (obj.quantity == 0) {
        const index = cart.findIndex((car) => car.product === obj.product);
        // console.log(index);
        state.value.splice(index, 1);
      }
      //   state.value.push(action.payload);
      // console.log("state ", state.value);
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
