import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  searchData: [],
  error: "",
};

export const fetchBooks = createAsyncThunk("books/fetch", () => {
  return axios.get("http://127.0.0.1:8000/books").then((res) => {
    return res.data;
  });
});

export const fetchSearchResults = createAsyncThunk(
  "books/search",
  async (data) => {
    const res = await axios.get(`http://127.0.0.1:8000/books/${data}`);
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.searchData = [];
      state.error = "";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.searchData = [];
      state.error = "";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.searchData = [];
      state.error = "";
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.error = "";
    });
  },
});

export default bookSlice.reducer;
