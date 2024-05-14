import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initialState
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//! create brand action
export const createBrandsAction = createAsyncThunk(
  "brands/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//* Fetch Brands Action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http request
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! slice
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //?create category (pending)
    builder.addCase(createBrandsAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(createBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });

    //? (rejected)
    builder.addCase(createBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    ////

    //! fetch  All category (pending)
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });

    //? (rejected)
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });

    //reset succes
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const brandsReducer = brandsSlice.reducer;

export default brandsReducer;
