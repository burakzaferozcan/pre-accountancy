import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/constant";

const initialState = {
  constantTable: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  message: "",
};

export const getAllConstant = createAsyncThunk(
  "constant/getAllConstant",
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

export const addUpdateConstant = createAsyncThunk(
  "constant/addUpdateConstant",
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

export const constantSlice = createSlice({
  name: "constant",
  initialState,
  reducers: {
    reset: (state) => {
      state.constantTable = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUpdate = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllConstant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllConstant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = false;
        state.isSuccess = true;
        state.constantTable = action.payload;
      })
      .addCase(getAllConstant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addUpdateConstant.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(addUpdateConstant.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(addUpdateConstant.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = constantSlice.actions;

export default constantSlice.reducer;
