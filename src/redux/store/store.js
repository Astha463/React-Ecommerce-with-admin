import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/usersSlice";
import productReducer from "../slice/products/productSlices";
import categoryReducer from "../slice/categories/categoriesSlice";
import brandsReducer from "../slice/categories/brandsSlice";
import colorsReducer from "../slice/categories/colorsSlice";
import cartReducer from "../slice/cart/cartSlice";
import couponsReducer from "../slice/coupons/couponsSlice";
import ordersReducer from "../slice/orders/ordersSlice";
import reviewsReducer from "../slice/reviews/reviewsSlice";

//create a store

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    carts: cartReducer,
    coupons: couponsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
  },
});

export default store;
