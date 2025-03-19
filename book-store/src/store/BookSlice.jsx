import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  searchData: [],
  createData: {},
  createMsg: "",
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

export const createBookAction = createAsyncThunk(
  "books/create",
  async (data) => {
    // console.log(data);
    const res = await axios.post(`http://127.0.0.1:8000/books/create/`, data);
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
      state.createData = {};
      state.createMsg = "";
      state.error = "";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.searchData = [];
      state.createData = {};
      state.createMsg = "";
      state.error = "";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.createData = {};
      state.createMsg = "";
      state.error = action.error.message;
    });
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.searchData = [];
      state.createData = {};
      state.createMsg = "";
      state.error = "";
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = action.payload;
      state.createData = {};
      state.createMsg = "";
      state.error = "";
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.createData = {};
      state.createMsg = "";
      state.error = "";
    });
    builder.addCase(createBookAction.pending, (state) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.createData = {};
      state.createMsg = "";
      state.error = "";
    });
    builder.addCase(createBookAction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.createData = action.payload;
      state.createMsg = action.payload.message;
      state.error = "";
    });
    builder.addCase(createBookAction.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.searchData = [];
      state.createData = {};
      state.createMsg = "";
      state.error = action.error.message;
    });
  },
});

export default bookSlice.reducer;
