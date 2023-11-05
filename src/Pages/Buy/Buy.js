import React, { useEffect, useState } from "react";
import styles from "./Buy.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShippingAddressForm from "../../Components/ShippingAddressForm/ShippingAddressForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { signUp } from "../../Redux/Authentication/authenticationSlice";
import StripeCheckout from "react-stripe-checkout";
import Completion from "../Completion/Completion";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { clearCart } from "../../Redux/Cart/cartSlice";

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardToken, setCardToken] = useState("");
  const [addressExists, setAddressExists] = useState(false);
  const dispatch = useDispatch();
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const userState = useSelector((state) => state.auth.user);

  const steps = ["Shipping address", "Choose a payment method", "Thank you"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [payment, setPayment] = React.useState("cod");

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const onToken = (token) => {
    setCardToken(token);
  };

  const handleNext = () => {
    if (activeStep === 2) {
      dispatch(clearCart());
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleGetSearchTerm = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (userState.address) {
      setAddressExists(true);
    }
  }, [userState.address]);

  const handleFullAddressExists = (add) => {
    if (add || userState.address) setAddressExists(true);
  };

  const initializeUserAddress = async () => {
    try {
      const addressRef = doc(db, userState.uID, "address"); // Reference the user's document

      const addressSnapshot = await getDoc(addressRef);
      const existingAddress = addressSnapshot.data()?.address || {};

      const {
        country,
        fullname,
        mobile,
        streetName,
        buildingNo,
        city,
        district,
        landmark,
        countryCode,
      } = existingAddress;
      const address = {
        country,
        fullname,
        mobile,
        streetName,
        buildingNo,
        city,
        district,
        landmark,
        countryCode,
      };
      const user = {
        userName: userState.userName,
        email: userState.email,
        photo: userState.photoURL,
        phone: userState.phone,
        uID: userState.uID,
        address,
      };
      dispatch(signUp(user));
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  };

  useEffect(() => {
    initializeUserAddress();
  }, []);
  return (
    <Box className={styles.mainBox}>
      <div className={`${styles.header}`}>
        <Header setSearchTerm={handleGetSearchTerm} />
      </div>
      {searchTerm.length === 0 ? (
        <Container className={styles.mainContainer}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <ShippingAddressForm fullAddressExists={handleFullAddressExists} />
          )}
          {activeStep === 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={payment}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="COD (Cash On Delivery)"
                  />
                  <div>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Pay with card"
                    />
                    {payment === "card" ? (
                      <StripeCheckout
                        token={onToken}
                        amount={Math.round((cartTotalPrice + 10) * 100)}
                        currency="usd"
                        stripeKey="pk_test_51O6bMFGejRGOgN0e88x9TatJEZ0kGLiW5E4c2950ShuXGg2Mqnf86p84Nz0uklYMQLL2h6Sp7iWTI8kFRPjQcDJX00pCFkAFx7"
                      />
                    ) : null}
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          )}
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  justifyContent: "center",
                }}
              >
                {activeStep > 0 && activeStep !== 2 && (
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />

                {activeStep === 0 && addressExists && (
                  <Button
                    onClick={handleNext}
                    className={styles.nextOrFinishButton}
                  >
                    Next
                  </Button>
                )}
                {activeStep === 1 && (cardToken || payment === "cod") && (
                  <Button
                    onClick={handleNext}
                    className={styles.nextOrFinishButton}
                  >
                    Place Your Order
                  </Button>
                )}
                {activeStep === 2 && <Completion />}
              </Box>
            </React.Fragment>
          )}
        </Container>
      ) : (
        <div className={`${styles.justifyContent} ${styles.mt_5}`}>
          <CategoryCard
            categoryUrl={""}
            categoryTitle={"electronics"}
            searchTerm={searchTerm.toLowerCase()}
          />
        </div>
      )}
      <ToastContainer />

      <Footer />
    </Box>
  );
};

export default Buy;
