import { Box, Button } from "@mui/material";
import React from "react";

const ButtonCommon = ({ name, type }) => {
  return (
    <Box>
      <Button variant="contained" size="small" type={type}>
        {name}
      </Button>
    </Box>
  );
};

export default ButtonCommon;
