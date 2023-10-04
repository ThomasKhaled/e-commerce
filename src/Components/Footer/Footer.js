import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import styles from "./Footer.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ResponsivePopup from "../../MUI/ResponsivePopup";

const Footer = () => {
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const handlePopup = () => {
    setOpenTermsAndConditions(true);
  };
  const handleOnClose = () => {
    setOpenTermsAndConditions(false);
  };
  return (
    <Box className={`${styles.footerContainer}`}>
      <Grid
        className={styles.footer}
        container
        color={"var(--mainColor)"}
        justifyContent={"center"}
      >
        <Grid container xs={12} sm={4} justifyContent={"center"}>
          <Grid item>
            <Typography
              variant="h6"
              color="var(--mainColor)"
              sx={{ textTransform: "uppercase" }}
            >
              Learn
            </Typography>
          </Grid>
          <Grid container direction={"column"} alignContent={"center"}>
            <Grid item>
              <Typography variant="body2" color="antiquewhite">
                About us
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="antiquewhite">
                About out products
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={12} sm={4} justifyContent={"center"}>
          <Grid item>
            <Typography
              variant="h6"
              color="var(--mainColor)"
              sx={{ textTransform: "uppercase" }}
            >
              Customer Service
            </Typography>
          </Grid>
          <Grid container direction={"column"} alignContent={"center"}>
            <Grid item>
              <Typography variant="body2" color="antiquewhite">
                Privacy and policy
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="antiquewhite"
                onClick={handlePopup}
                sx={{ cursor: "pointer" }}
              >
                Terms and conditions
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={12} sm={4} justifyContent={"center"}>
          <Grid item>
            <Typography
              variant="h6"
              color="var(--mainColor)"
              sx={{ textTransform: "uppercase" }}
            >
              Contact us
            </Typography>
          </Grid>
          <Grid container direction={"column"}>
            <Grid item container direction={"row"} justifyContent={"center"}>
              <LocationOnOutlinedIcon />
              <Typography variant="body2" color="antiquewhite" ml={1}>
                Block 257, Road 5720, <br /> Building 2678, Shop 0
              </Typography>
            </Grid>
            <Grid item container direction={"row"} justifyContent={"center"}>
              <EmailOutlinedIcon />
              <Typography variant="body2" color="antiquewhite" ml={1}>
                thomaskhaled01@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ResponsivePopup
        openD={openTermsAndConditions}
        onCloseD={handleOnClose}
      />
      <Grid className={styles.copyRights} container justifyContent={"center"}>
        MegaMart &copy; 2022-2023
      </Grid>
    </Box>
  );
};

export default Footer;
