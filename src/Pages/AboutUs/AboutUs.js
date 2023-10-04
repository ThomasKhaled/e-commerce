import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <Box className={styles.mainBox}>
      <Header></Header>
      <Container
        className={styles.aboutUsContainer}
        sx={{
          padding: 2,
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={10} lg={12}>
            <Card elevation={9} sx={{ padding: 2 }}>
              <Typography
                variant="h2"
                color="initial"
                sx={{
                  textAlign: "center",
                  fontFamily: "Nunito",
                  fontSize: "3.5rem",
                  "@media (max-width: 600px)": {
                    fontSize: "2rem", // Adjust font size for smaller screens
                  },
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h3"
                color="initial"
                sx={{
                  textAlign: "center",
                  fontFamily: "Nunito",
                  fontSize: "2.5rem",
                  mb: "15px",
                  "@media (max-width: 600px)": {
                    fontSize: "1.5rem", // Adjust font size for smaller screens
                  },
                }}
              >
                Welcome To MegaMart
              </Typography>
              <Typography
                variant="body2"
                color="initial"
                sx={{
                  fontFamily: "Nunito",
                  fontSize: "1rem",
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem", // Adjust font size for smaller screens
                  },
                }}
              >
                MegaMart is a Professional eCommerce Platform. Here we will
                provide you only interesting content, which you will like very
                much. We're dedicated to providing you the best of eCommerce,
                with a focus on dependability and Online shopping. We're working
                to turn our passion for eCommerce into a booming online website.
                We hope you enjoy our eCommerce as much as we enjoy offering
                them to you.
              </Typography>
              <Typography
                variant="body2"
                color="initial"
                sx={{
                  mt: 2,
                  fontFamily: "Nunito",
                  fontSize: "1rem",
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem", // Adjust font size for smaller screens
                  },
                }}
              >
                I will keep posting more important posts on my Website for all
                of you. Please give your support and love.
              </Typography>

              <Typography
                variant="body1"
                color="initial"
                sx={{
                  textAlign: "center",
                  fontWeight: "800",
                  fontFamily: "Nunito",
                  fontSize: "1.2rem",
                  "@media (max-width: 600px)": {
                    fontSize: "1rem", // Adjust font size for smaller screens
                  },
                }}
              >
                Thanks For Visiting Our Site
              </Typography>
              <Typography
                variant="body2"
                color="var(--mainColor)"
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontFamily: "Nunito",
                  fontSize: "1.2rem",
                  "@media (max-width: 600px)": {
                    fontSize: "1rem", // Adjust font size for smaller screens
                  },
                }}
              >
                Have a nice day!
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

export default AboutUs;
