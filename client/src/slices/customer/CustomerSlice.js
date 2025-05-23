import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/customer";

const initialState = {
  customerTable: [],
  editCustomer: {},
  balanceTable: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  isEdit: false,
  isBalanceRefresh: false,
  message: "",
};

export const getAllCustomer = createAsyncThunk(
  "customer/getAllCustomer",
  async (_, thunkAPI) => {
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
      const response = await axios.get(API_URL, configToken);
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

export const getCustomerById = createAsyncThunk(
  "customer/getCustomerById",
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
      const response = await axios.get(`${API_URL}/${id}`, configToken);
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

export const deleteCustomerById = createAsyncThunk(
  "customer/deleteCustomerById",
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

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
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

export const updateCustomerById = createAsyncThunk(
  "customer/updateCustomerById",
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
      const response = await axios.put(
        `${API_URL}/${data.id}`,
        data,
        configToken
      );
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

export const getCustomerInfoById = createAsyncThunk(
  "customer/getCustomerInfoById",
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
      const response = await axios.get(`${API_URL}/info/${id}`, configToken);
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

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    reset: (state) => {
      state.customerTable = [];
      state.editCustomer = {};
      state.balanceTable = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUpdate = false;
      state.isEdit = false;
      state.isBalanceRefresh = false;
      state.message = "";
    },
    setMessageRemove: (state) => {
      state.message = "";
    },
    setEditRemove: (state) => {
      state.editCustomer = {};
    },
    setBalanceRefresh: (state) => {
      state.isBalanceRefresh = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = false;
        state.isSuccess = true;
        state.customerTable = action.payload;
      })
      .addCase(getAllCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEdit = true;
        state.editCustomer = action.payload;
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCustomerById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(deleteCustomerById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(deleteCustomerById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCustomer.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCustomerById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(updateCustomerById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(updateCustomerById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCustomerInfoById.pending, (state) => {
        state.isBalanceRefresh = false;
      })
      .addCase(getCustomerInfoById.fulfilled, (state, action) => {
        state.isBalanceRefresh = true;
        state.balanceTable = action.payload;
      })
      .addCase(getCustomerInfoById.rejected, (state, action) => {
        state.isBalanceRefresh = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setMessageRemove, setEditRemove, setBalanceRefresh } =
  customerSlice.actions;

export default customerSlice.reducer;
