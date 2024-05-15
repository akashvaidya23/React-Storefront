import { createSlice } from "@reduxjs/toolkit";

const storedCartItems = localStorage.getItem("cartItems");
const initialState = {
  value: storedCartItems ? JSON.parse(storedCartItems) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
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
      localStorage.setItem("cartItems", JSON.stringify(cart));
    },

    removeFromCart: (state, action) => {
      let cart = [...state.value];
      let obj = action.payload;
      const index = cart.findIndex((car) => car.product === obj.product);
      console.log("in slice delete ", obj, index);
      state.value.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cart));
    },

    // addToSaveForLater: (state, action) => {
    //   let cart = [...state.value];
    //   let obj = action.payload;
    //   console.log("in slice save later ", obj);
    //   cart.map((carts) => {
    //     if (carts.product == obj.product) {
    //       carts.save_for_later = 1;
    //     }
    //   });
    //   localStorage.setItem("cartItems", JSON.stringify(cart));
    // },
    emptyCart: (state) => {
      state.value = [];
      localStorage.setItem("cartItems", []);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addToSaveForLater,
  removeFromSaveForLater,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
