import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction } from "../globalActions/globalActions";

//initialState
const initialState = {
  loading: false, //loading for all state
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false, //Loading for authentication state
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//Login Action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });

      //save the user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Registeration Action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //make http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        fullname,
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//? Update user shipping address action
export const updateUserShippingAddressAction = createAsyncThunk(
  "users/update-shipping-address",
  async (
    {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      province,
      phone,
      country,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the http request
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          phone,
          country,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! get User profile action
export const getUserProfileAction = createAsyncThunk(
  "users/profile-fetched",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make the http request
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//? logout action
export const logoutAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    localStorage.removeItem("userInfo");
    return true;
  }
);

// Users Slice

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //handle action

    //login  (pending)
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });

    //(fulfilled)
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });

    //(rejected)
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    ////

    //! Register  (pending)
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    //(rejected)
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ///
    //? Update user shipping address  (pending) (dispatching it to AddShippingAddres component)
    builder.addCase(
      updateUserShippingAddressAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    //?(fullfilled)
    builder.addCase(
      updateUserShippingAddressAction.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }
    );

    //?(rejected)
    builder.addCase(
      updateUserShippingAddressAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    //? logout  (fullfilled)
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });

    //! get User profile action (pending)

    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });

    //(rejected)
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
    state.error = action.payload;
      state.loading = false;
    });

    ////

    //reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
      state.userAuth.error = null;
    });
  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
