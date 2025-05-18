import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/stock";

const initialState = {
  stockTable: [],
  editStock: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  isEdit: false,
  message: "",
};

export const getAllStock = createAsyncThunk(
  "stock/getAllStock",
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

export const getStockById = createAsyncThunk(
  "stock/getStockById",
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

export const deleteStockById = createAsyncThunk(
  "stock/deleteStockById",
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

export const addStock = createAsyncThunk(
  "stock/addStock",
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

export const updateStockById = createAsyncThunk(
  "stock/updateStockById",
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

export const customerSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    reset: (state) => {
      state.stockTable = [];
      state.editStock = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUpdate = false;
      state.isEdit = false;
      state.message = "";
    },
    setMessageRemove: (state) => {
      state.message = "";
    },
    setEditRemove: (state) => {
      state.editStock = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = false;
        state.isSuccess = true;
        state.stockTable = action.payload;
      })
      .addCase(getAllStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStockById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEdit = true;
        state.editStock = action.payload;
      })
      .addCase(getStockById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStockById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(deleteStockById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(deleteStockById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addStock.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(addStock.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateStockById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(updateStockById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(updateStockById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setMessageRemove, setEditRemove } = stockSlice.actions;

export default stockSlice.reducer;
