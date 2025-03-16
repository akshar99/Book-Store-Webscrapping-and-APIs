import React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material";

const BookCard = (props) => {
  console.log(props);
  return (
    <Box>
      {console.log(props.props)}
      {/* {props.props.brand_name} */}
      <Card>
        <CardContent>
          <Typography variant="h6">{props.props.name}</Typography>
          <Typography variant="b2">{props.props.price}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookCard;
