import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/purchase/payment";

const initialState = {
  paymentTable: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  message: "",
};

export const getAllPayment = createAsyncThunk(
  "payment/getAllPayment",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const configToken = {
        headers: {
          "Access-Origin-Control-Origin": "*",
          "Content-Type": "application/json",
          mode: "cors",
          crossDomain: true,
          token: token,
        },
      };
      const response = await axios.get(API_URL, `/${id}`, configToken);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePaymentById = createAsyncThunk(
  "payment/deletePaymentById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const configToken = {
        headers: {
          "Access-Origin-Control-Origin": "*",
          "Content-Type": "application/json",
          mode: "cors",
          crossDomain: true,
          token: token,
        },
      };
      const response = await axios.delete(`${API_URL}/${id}`, configToken);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const configToken = {
        headers: {
          "Access-Origin-Control-Origin": "*",
          "Content-Type": "application/json",
          mode: "cors",
          crossDomain: true,
          token: token,
        },
      };
      const response = await axios.post(API_URL, data, configToken);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => {
      state.paymentTable = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUpdate = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = false;
        state.isSuccess = true;
        state.salesTable = action.payload;
      })
      .addCase(getAllPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePaymentById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(deletePaymentById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(deletePaymentById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addPayment.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = paymentSlice.actions;

export default paymentSlice.reducer;
