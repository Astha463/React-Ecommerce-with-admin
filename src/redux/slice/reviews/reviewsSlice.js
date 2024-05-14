import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  reviews: [],
  review: {},
  loading: false,
  error: false,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create reviews action
export const createReviewAction = createAsyncThunk(
  "review/create",
  async ({ rating, message, id }, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make request
      const { data } = await axios.post(
        `${baseURL}/reviews/${id}`,
        { rating, message },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    //create (pending)
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.isAdded = true;
    });

    //(rejected)
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.review = null;
      state.error = action.payload;
      state.isAdded = false;
    });

    //reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });

    //reset error action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate the reducer
const reviewsReducer = reviewsSlice.reducer;
export default reviewsReducer;
