import { Box } from "@mui/material";
import React, { useState } from "react";
import InputCommon from "../components/InputCommon";
import ButtonCommon from "../components/ButtonCommon";
import { useDispatch, useSelector } from "react-redux";
import { createBookAction } from "../store/BookSlice";

const BookCreate = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const data = {
    name,
    rating,
    price,
    status,
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBookAction(data));
  };
  const newState = useSelector((state) => state.books);
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <InputCommon label={"Book Name"} state={name} setState={setName} />
      <InputCommon label={"Book Rating"} state={rating} setState={setRating} />
      <InputCommon label={"Book Price"} state={price} setState={setPrice} />
      <InputCommon label={"Book Status"} state={status} setState={setStatus} />
      <ButtonCommon name={"submit"} type={"submit"} />
      {console.log(newState.createData)}
    </Box>
  );
};

export default BookCreate;
