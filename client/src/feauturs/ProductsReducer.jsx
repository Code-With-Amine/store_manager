import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../api/axios"; // Import your API library

export const fetchProducts = createAsyncThunk(
  "ProductsReducer/fetchProducts",
  async (catId) => { // Pass catId as an argument
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axiosClient.get("/sanctum/csrf-cookie");
    const res = await axiosClient.get(`/api/products/${catId}`, { headers });
    return res.data.data;
  }
);

export const ProductsReducer = createSlice({
  name: "ProductsReducer",
  initialState: {
    products: [],
    loading: false,
    error: null,
    catId: null,
  },
  reducers: {
    setCatId: (state, action) => {
      state.catId = action.payload; // Update catId in the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCatId, dispatch } = ProductsReducer.actions;
export default ProductsReducer.reducer;
