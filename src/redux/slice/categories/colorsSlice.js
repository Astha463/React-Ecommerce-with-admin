import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//!initial state
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//! create color Action
export const createColorAction = createAsyncThunk(
  "color/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token -Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${baseURL}/colors`, { name }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Fetch colors Action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! slice
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //?create category (pending)
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });

    //? (rejected)
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    ////

    //! fetch  All category (pending)
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });

    //? (rejected)
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded=false
      state.error = null;
    });

    //reset succes
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error= null
    });
  },
});

//generate the reducer
const colorsReducer = colorsSlice.reducer;

export default colorsReducer;
