import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box>
      <Grid container color={"var(--mainColor)"}>
        <Grid item>MegaMart &copy; 2022-2023</Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
