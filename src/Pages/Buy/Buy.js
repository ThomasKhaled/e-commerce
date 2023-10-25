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
import Paper from "@mui/material/Paper";
import ShippingAddressForm from "../../Components/ShippingAddressForm/ShippingAddressForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addressExists, setAddressExists] = useState(false);

  const userState = useSelector((state) => state.auth.user);

  const steps = [
    "Shipping address",
    "Choose a payment method",
    "Place your Order",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep > 0 && (
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
                    {activeStep === steps.length - 1
                      ? "Place Your Order"
                      : "Next"}
                  </Button>
                )}
                {activeStep > 0 && (
                  <Button
                    onClick={handleNext}
                    className={styles.nextOrFinishButton}
                  >
                    {activeStep === steps.length - 1
                      ? "Place Your Order"
                      : "Next"}
                  </Button>
                )}
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
