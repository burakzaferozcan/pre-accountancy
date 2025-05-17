import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/sales";

const initialState = {
  salesTable: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  message: "",
};

export const getAllSales = createAsyncThunk(
  "sales/getAllSales",
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

export const deleteSalesById = createAsyncThunk(
  "sales/deleteSalesById",
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

export const addSales = createAsyncThunk(
  "sales/addSales",
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

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    reset: (state) => {
      state.salesTable = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUpdate = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = false;
        state.isSuccess = true;
        state.salesTable = action.payload;
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSalesById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(deleteSalesById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(deleteSalesById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addSales.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(addSales.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(addSales.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = salesSlice.actions;

export default salesSlice.reducer;
