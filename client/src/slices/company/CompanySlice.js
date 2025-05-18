import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/company";

const initialState = {
  companyTable: [],
  editCompany: {},
  balanceTable: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  isEdit: false,
  isBalanceRefresh: false,
  message: "",
};

export const getAllCompany = createAsyncThunk(
  "company/getAllCompany",
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

export const getCompanyById = createAsyncThunk(
  "company/getCompanyById",
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

export const deleteCompanyById = createAsyncThunk(
  "company/deleteCompanyById",
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

export const addCompany = createAsyncThunk(
  "company/addCompany",
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

export const updateCompanyById = createAsyncThunk(
  "company/updateCompanyById",
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

export const getCompanyInfoById = createAsyncThunk(
  "company/getCompanyInfoById",
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

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    reset: (state) => {
      state.companyTable = [];
      state.editCompany = {};
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
      .addCase(getAllCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = false;
        state.isSuccess = true;
        state.companyTable = action.payload;
      })
      .addCase(getAllCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEdit = true;
        state.editCompany = action.payload;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCompanyById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(deleteCompanyById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(deleteCompanyById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCompany.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCompanyById.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(updateCompanyById.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.message = action.payload;
      })
      .addCase(updateCompanyById.rejected, (state, action) => {
        state.isUpdate = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanyInfoById.pending, (state) => {
        state.isBalanceRefresh = false;
      })
      .addCase(getCompanyInfoById.fulfilled, (state, action) => {
        state.isBalanceRefresh = true;
        state.balanceTable = action.payload;
      })
      .addCase(getCompanyInfoById.rejected, (state, action) => {
        state.isBalanceRefresh = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setMessageRemove, setEditRemove, setBalanceRefresh } =
  companySlice.actions;

export default companySlice.reducer;
