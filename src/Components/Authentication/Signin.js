import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Signup from "./Signup";
import Grid from "@mui/material/Grid";
import styles from "./Signup.module.css";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signStatus, setSignStatus] = useState("sign_in");
  const state = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Create a history obj

  const handleSignChange = (event, newStatus) => {
    setSignStatus(newStatus);
  };

  const textFieldColor = {
    color: "white",
    fontSize: "1.1rem",
    borderColor: "white",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return signStatus === "sign_up" ? (
    <Signup />
  ) : (
    <div className={styles.pageContainer}>
      <div className={styles.background}></div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={styles.gridContainer}
      >
        <Grid
          item
          className={styles.formContainer}
          xs={10}
          sm={6}
          md={8}
          lg={4}
          padding={4}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (state === null) {
                alert("Register first!");
              } else {
                if (
                  values.email === state.email &&
                  values.password === state.password
                ) {
                  navigate("/main");
                } else {
                  alert("Check your email or password!");
                }
              }
            }}
          >
            {(props) => (
              <Form>
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginBottom={3}
                >
                  <Grid item>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      value={signStatus}
                      onChange={handleSignChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="sign_in" style={textFieldColor}>
                        Sign In
                      </ToggleButton>
                      <ToggleButton value="sign_up" style={textFieldColor}>
                        Sign Up
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" direction="column">
                  <Grid item>
                    <AccountCircleIcon color="primary" fontSize="large" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      color="initial"
                      style={textFieldColor}
                    >
                      Sign In
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="initial"
                      marginBottom={2}
                      style={textFieldColor}
                    >
                      Please fill in your credentials!
                    </Typography>
                  </Grid>
                </Grid>
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  fullWidth
                  variant="filled"
                  color="info"
                  focused
                  InputProps={{
                    style: textFieldColor, // Apply the custom styles to the input element
                  }}
                />
                <Field
                  as={TextField}
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  fullWidth
                  variant="filled"
                  color="info"
                  focused
                  margin="normal"
                  InputProps={{
                    style: textFieldColor, // Apply the custom styles to the input element
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
