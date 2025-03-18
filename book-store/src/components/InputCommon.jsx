import { Box, TextField } from "@mui/material";
import React from "react";

const InputCommon = ({ label, state, setState }) => {
  return (
    <Box>
      <TextField
        id="common"
        label={label}
        variant="outlined"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      {console.log(state)}
    </Box>
  );
};

export default InputCommon;
