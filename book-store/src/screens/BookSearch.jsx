import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../store/BookSlice";
import BookCard from "../components/BookCard";

const BookSearch = () => {
  const [book, setBook] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchSearchResults(book));
  };
  const bookData = useSelector((state) => state.books);
  console.log(bookData.searchData);
  return (
    <>
      <SearchForm
        name={"Enter Name of the Book"}
        handleClick={handleClick}
        setBook={setBook}
        book={book}
      />
      {bookData.searchData.length > 0 && (
        <BookCard props={bookData.searchData[0]} />
      )}
    </>
  );
};

export default BookSearch;

/*
pass setBook and handleClick as props
state -> book is updated
book dispatched from here as action.payload
*/
