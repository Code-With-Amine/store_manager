import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import your API library
import { axiosClient } from "../api/axios";

export const fetchCategories = createAsyncThunk(
  "storeReducer/fetchCategories",
  async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axiosClient.get("/sanctum/csrf-cookie");
    const res = await axiosClient.get("/api/categories", { headers });
    return res.data.data;
  }
);

export const storeReducer = createSlice({
  name: "storeReducer",
  initialState: {
    categories: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fillProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fillProducts } = storeReducer.actions;
export const { dispatch } = storeReducer; // Dispatch function for thunks
export default storeReducer.reducer;
