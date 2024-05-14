import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//!create product Action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        brand,
        category,
        totalQty,
        sizes,
        colors,
        price,
        files,
      } = payload;

      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //FormData

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("totalQty", totalQty);
      formData.append("price", price);

      //! sizes
      sizes.forEach((size) => {
        formData.append("sizes", size);
      });

      //! colors
      colors.forEach((color) => {
        formData.append("colors", color);
      });

      //! files
      files.forEach((file) => {
        formData.append("files", file);
      });

      //make http request
      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! fetch product action
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    console.log(url);
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${url}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//? Fetch single product details  action

export const fetchSingleProductAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${baseURL}/products/${productId}`,
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

//! Product update
export const updateProductAction = createAsyncThunk(
  "product/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        id,
      } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/products/${id}`,
        { name, description, category, sizes, brand, colors, price, totalQty },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// export const deleteProductAction = createAsyncThunk(
//   'products/delete',
//   async (productId, { dispatch, rejectWithValue }) => {
//     try {
//       // Make API call to delete the product
//       await axios.delete(`${baseURL}/products/${productId}`);
      
//       // Return the productId as a fulfilled action payload
//       return productId;
//     } catch (error) {
//       // Return the error message as a rejected action payload
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

export const deleteProductAction = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${baseURL}/products/${productId}`, config);

      // Return the product ID on successful deletion
      return productId;
    } catch (error) {
      // Return the error response data on failure
      return rejectWithValue(error?.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create product (Pending)
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    //(rejected)
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    ////

    //! Fetch all products (pending)
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products; 
      state.isAdded = true;
    });

    // (rejected)
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    ////

    //? Fetch single product details  action (pending)
    builder.addCase(fetchSingleProductAction.pending, (state) => {
      state.loading = true;
    });

    //?(Fullfilled)
    builder.addCase(fetchSingleProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    //? (rejected)
    builder.addCase(fetchSingleProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      // Filter out the deleted product
      state.products = state.products.filter((product) => product._id !== action.payload);
      // Set deletion flag to true
      state.isDeleted = true;
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      // Set deletion flag to false
      state.isDeleted = false;
      // Set error message if available
      state.error = action.payload?.message;
    });
  
     //Update product (Pending)
     builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isUpdated = true;
    });

    //(rejected)
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isUpdated = false;
      state.error = action.payload;
    });


    ////
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
const productReducer = productSlice.reducer;

export default productReducer;
