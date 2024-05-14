import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//add product to cart
export const addOrderToCartAction = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    //push to local storage
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);

//! get cart item from local storage
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    return cartItems;
  }
);

//Change order qty
export const changeOrderItemQtyAction = createAsyncThunk(
  "cart/change-item-qty",
  async ({ productId, qty }) => {
    console.log(productId, qty);
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newCartItems = cartItems?.map((item) => {
      if (item?._id === productId?.toString()) {
        //get new price
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
        // console.log(item)
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

//! Remove from cart
export const removeOrderItemQtyAction = createAsyncThunk(
  "cart/removeOrderItem",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const newItems = cartItems?.filter((item) => item?._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

//slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //add to cart (pending)

    builder.addCase(addOrderToCartAction.pending, (state) => {
      state.loading = true;
    });

    //(fulfilled)
    builder.addCase(addOrderToCartAction.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.isAdded = action.payload;
      state.loading = false;
      state.error = null;
    });

    //(rejected)
    builder.addCase(addOrderToCartAction.rejected, (state, action) => {
      state.error = action.payload;
      state.isAdded = false;
      state.loading = false;
      state.cartItems = null;
    });

    //Fetch cart items(pending)

    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });

    //(fulfilled)
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.cartItems = action.payload;
        state.isAdded = action.payload;
        state.loading = false;
        state.error = null;
      }
    );

    //(rejected)
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.isAdded = false;
        state.loading = false;
        state.cartItems = null;
      }
    );
  },
});

//generate the reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
