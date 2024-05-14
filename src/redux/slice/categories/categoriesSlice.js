import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initialState
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//! create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, file } = payload;

      //formData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);

      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//* Fetch categories Action
export const fetchCategoryAction = createAsyncThunk(
  "category/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http request
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //?create category (pending)
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });


    //? (rejected)
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    ////

    //! fetch  All category (pending)
    builder.addCase(fetchCategoryAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    //? (rejected)
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.error = action.payload;
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
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
