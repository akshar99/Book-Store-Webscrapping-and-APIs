import { Box, Button, TextField } from "@mui/material";
import React from "react";

const SearchForm = (props) => {
  return (
    <Box component={"form"} onSubmit={props.handleClick}>
      <TextField
        id="book-search"
        label={props.name}
        value={props.book}
        onChange={(e) => {
          props.setBook(e.target.value);
        }}
        variant="outlined"
      />
      <Button type="submit" variant="contained" size="small">
        Submit
      </Button>
    </Box>
  );
};

export default SearchForm;
