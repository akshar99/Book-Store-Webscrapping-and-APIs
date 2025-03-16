import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/BookSlice";
import { Button } from "@mui/material";

const BooksDisplay = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  const books = useSelector((state) => state.books);
  //   console.log(books.data);
  return (
    <div>
      {books.data.slice(page * 10 - 10, page * 10).map((book) => (
        <BookCard props={book} key={book.id} />
      ))}
      <Button
        variant={page === 1 ? "contained" : "outlined"}
        size="small"
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1 ? true : false}
      >
        Back
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page >= Math.ceil(books.data.length) ? true : false}
      >
        Next
      </Button>
    </div>
  );
};

export default BooksDisplay;
