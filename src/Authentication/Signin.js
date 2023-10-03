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
import { mergedSchemas } from "./validationSchemas";
import { validationSchemas } from "./validationSchemas";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  const [signStatus, setSignStatus] = useState("sign_in");
  const [pressedSignIn, setPressedSignIn] = useState(false);
  const [isStateNull, setIsStateNull] = useState(true);
  const state = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Create a history obj

  const handleSignChange = (event, newStatus) => {
    setSignStatus(newStatus);
  };

  const mainStyle = {
    color: "white",
    fontSize: "1.1rem",
    borderColor: "white",
  };

  const emailSchema = validationSchemas.email;
  const passwordSchema = validationSchemas.password;
  const merged_Schemas = mergedSchemas(emailSchema, passwordSchema);
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
            validationSchema={merged_Schemas}
            onSubmit={(values) => {
              setPressedSignIn(true);
              if (state === null) {
                setIsStateNull(true);
              } else {
                if (
                  values.email === state.email &&
                  values.password === state.password
                ) {
                  navigate("/main");
                } else {
                  setIsStateNull(false);
                }
              }
            }}
          >
            {({ touched, errors }) => (
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
                      <ToggleButton value="sign_in" style={mainStyle}>
                        Sign In
                      </ToggleButton>
                      <ToggleButton value="sign_up" style={mainStyle}>
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
                    <Typography variant="h6" color="initial" style={mainStyle}>
                      Sign In
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="initial"
                      marginBottom={2}
                      style={mainStyle}
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
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  color="info"
                  focused
                  InputProps={{
                    style: mainStyle, // Apply the custom styles to the input element
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
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  color="info"
                  focused
                  margin="normal"
                  InputProps={{
                    style: mainStyle, // Apply the custom styles to the input element
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                >
                  Sign In
                </Button>
                {pressedSignIn && !isStateNull && (
                  <Alert
                    variant="filled"
                    severity="error"
                    className={styles.errorAlert}
                  >
                    You must fill all the fields!
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
