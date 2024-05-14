import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: false,
  isAdded: false,
  isUpdated: false,
  stats: null,
};

//! place order Action
export const placeOrderAction = createAsyncThunk(
  "order/place-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { orderItems, shippingAddress, totalPrice } = payload;
      //! token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //!make http request
      const { data } = await axios.post(
        `${baseURL}/orders`,
        { orderItems, shippingAddress, totalPrice },
        config
      );
      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//? Fetch orders Action
export const fetchOrdersAction = createAsyncThunk(
  "orders/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch single order action

export const fetchSingleOrderAction = createAsyncThunk(
  "order/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${baseURL}/orders/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get  orders stats Action
export const ordersStatsAction = createAsyncThunk(
  "orders/statistics",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//* Update order Action
export const updateOrderAction = createAsyncThunk(
  "order/update-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { status,id } = payload;
      //! token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //!make http request
      const { data } = await axios.put(
        `${baseURL}/orders/update/${id}`,
        { status },
        config
      );
      return data
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //! create (pending)
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
    });

    //! (fullfilled)
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.isAdded = true;
    });

    //! (rejected)
    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdded = false;
      state.order = null;
    });

    //? Fetch order (pending)
    builder.addCase(fetchOrdersAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });

    //? (rejected)
    builder.addCase(fetchOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.orders = null;
    });

    //! Fetch Single order (pending)
    builder.addCase(fetchSingleOrderAction.pending, (state) => {
      state.loading = true;
    });

    //! (fullfilled)
    builder.addCase(fetchSingleOrderAction.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });

    //! (rejected)
    builder.addCase(fetchSingleOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.order = null;
    });

    //?  order stats (pending)
    builder.addCase(ordersStatsAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(ordersStatsAction.fulfilled, (state, action) => {
      state.stats = action.payload;
      state.loading = false;
    });

    //? (rejected)
    builder.addCase(ordersStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.stats = null;
    });

//* Update order  (pending)
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });

    //? (rejected)
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.order = null;
    });


    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });

    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const ordersReducer = ordersSlice.reducer;

export default ordersReducer;
