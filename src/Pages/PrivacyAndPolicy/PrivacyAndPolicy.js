import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./PrivacyAndPolicy.module.css";

const PrivacyAndPolicy = () => {
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
                  fontSize: "3.8rem",
                  "@media (max-width: 600px)": {
                    fontSize: "2rem", // Adjust font size for smaller screens
                  },
                }}
              >
                MegaMart
              </Typography>
              <Typography
                variant="h3"
                color="initial"
                sx={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                  mb: "15px",
                  "@media (max-width: 600px)": {
                    fontSize: "1.5rem", // Adjust font size for smaller screens
                  },
                }}
              >
                Privacy & Policy
              </Typography>
              <Typography
                variant="body2"
                color="initial"
                sx={{
                  fontSize: "1rem",
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem", // Adjust font size for smaller screens
                  },
                }}
              >
                <span className={styles.p_p_Titles}>
                  Effective Date:{" "}
                  <span className={styles.p_p_date}>10/10/2023</span> At
                  MegaMart,
                </span>
                <br /> we value your privacy and are committed to protecting
                your personal information. <br /> This Privacy Policy outlines
                how we collect, use, and protect the information you provide to
                us when using our website.
                <br /> By accessing our website, you consent to the terms of
                this Privacy Policy.
                <br />{" "}
                <span className={styles.p_p_Titles}>
                  1. Collection of Information
                </span>
                <br /> We may collect personal information such as your name,
                email address, phone number, shipping address, and payment
                details when you create an account, place an order, or interact
                with our website. Additionally, we may collect non-personal
                information such as your IP address, browser type, and operating
                system.
                <br />{" "}
                <span className={styles.p_p_Titles}>2. Use of Information</span>
                <br /> We use the information we collect to process your orders,
                provide customer service, personalize your shopping experience,
                and communicate with you about our products, promotions, and
                offers. We may also use your information for internal purposes
                such as improving our website and analyzing customer
                preferences.
                <br />{" "}
                <span className={styles.p_p_Titles}>
                  3. Protection of Information
                </span>
                <br /> We take appropriate measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction. We use industry-standard security measures and
                protocols to safeguard the information you provide to us.
                <br />{" "}
                <span className={styles.p_p_Titles}>
                  4. Sharing of Information
                </span>
                <br /> We may share the information you provide with trusted
                third-party service providers that assist us in operating our
                website, conducting our business, or servicing you. However, we
                do not sell, trade, or transfer your personal information to
                outside parties without your consent, except as necessary to
                fulfill your requests or comply with legal requirements. Cookies
                We use cookies, which are small data files stored on your
                device, to enhance your browsing experience and provide
                personalized content.
                <br /> <span className={styles.p_p_Titles}>5. Cookies</span>
                <br /> may also be used for website analytics and remarketing
                purposes. By using our website, you consent to the use of
                cookies.
                <br />{" "}
                <span className={styles.p_p_Titles}>6. Third-Party Links</span>
                <br /> Our website may contain links to third-party websites. We
                are not responsible for the privacy practices or content of
                these websites. We encourage you to review the privacy policies
                of any third-party websites you visit.
                <br />{" "}
                <span className={styles.p_p_Titles}>7. Children's Privacy</span>
                <br /> Our website is not intended for children under the age of
                13. We do not knowingly collect personal information from
                children. If you believe that we have unknowingly collected
                information from a child, please contact us immediately.
                <br />{" "}
                <span className={styles.p_p_Titles}>
                  8. Changes to the Privacy Policy
                </span>
                <br /> We reserve the right to modify or update this Privacy
                Policy at any time without prior notice. Any changes will be
                effective immediately upon posting the revised Privacy Policy on
                our website.
              </Typography>
              <Typography
                variant="body2"
                color="initial"
                sx={{
                  mt: 2,
                  fontSize: "1rem",
                  "@media (max-width: 600px)": {
                    fontSize: "0.9rem", // Adjust font size for smaller screens
                  },
                }}
              >
                By using our website, you acknowledge that you have read and
                understood this Privacy Policy. <br />
                <span className={styles.p_p_Titles}>
                  If you have any questions or concerns, please contact us at
                  thomaskhaled01@gmail.com.
                </span>
              </Typography>

              <Typography
                variant="body1"
                color="initial"
                sx={{
                  textAlign: "center",
                  fontWeight: "800",
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

export default PrivacyAndPolicy;
