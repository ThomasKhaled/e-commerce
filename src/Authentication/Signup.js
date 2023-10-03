import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import SignIn from "./Signin";
import Grid from "@mui/material/Grid";
import styles from "./Signup.module.css";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { validationSchemas } from "./validationSchemas";
import { useDispatch } from "react-redux/";
import { signUp } from "../Redux/Authentication/authenticationSlice";
import { mergedSchemas } from "./validationSchemas";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("male");
  const [signStatus, setSignStatus] = useState("sign_up");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);
  const [pressedSignUp, setPressedSignUp] = useState(false);

  const handleSignChange = (event, newStatus) => {
    setSignStatus(newStatus);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const mainStyle = {
    color: "white",
    fontSize: "1.1rem",
    borderColor: "white",
  };

  const handleSignup = (user) => {
    dispatch(signUp(user));
    setSignStatus("sign_in");
  };

  const usernameSchema = validationSchemas.userName;
  const phoneNumberSchema = validationSchemas.phoneNumber;
  const emailSchema = validationSchemas.email;
  const passwordSchema = validationSchemas.password;
  const confirmPasswordSchema = validationSchemas.confirmPassword;

  const merged_Schemas = mergedSchemas(
    usernameSchema,
    phoneNumberSchema,
    emailSchema,
    passwordSchema,
    confirmPasswordSchema
  );

  return signStatus === "sign_in" ? (
    <SignIn />
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
              userName: "",
              phoneNumber: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={merged_Schemas}
          >
            {({ errors, touched, values }) => (
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
                      Sign Up
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="initial"
                      style={mainStyle}
                    >
                      Please fill this form to create an account!
                    </Typography>
                  </Grid>
                </Grid>

                <Field
                  as={TextField}
                  id="username"
                  label="Username"
                  name="userName"
                  placeholder="Username"
                  variant="filled"
                  color="info"
                  focused
                  fullWidth
                  margin="normal"
                  error={touched.userName && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                  className={styles.test}
                  InputProps={{
                    style: mainStyle, // Apply the custom styles to the input element
                  }}
                />
                <Field
                  as={TextField}
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  placeholder="Email"
                  fullWidth
                  variant="filled"
                  color="info"
                  focused
                  InputProps={{
                    style: mainStyle, // Apply the custom styles to the input element
                  }}
                />
                <FormControl margin="normal">
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    style={mainStyle}
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={handleGenderChange}
                    style={mainStyle}
                  >
                    <Grid container>
                      <Grid item>
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
                <Field
                  as={TextField}
                  id="phone"
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  fullWidth
                  margin="normal"
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  variant="filled"
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
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="filled"
                  color="info"
                  focused
                  InputProps={{
                    style: mainStyle, // Apply the custom styles to the input element
                  }}
                />
                <Field
                  as={TextField}
                  id="confirm_password"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  fullWidth
                  margin="normal"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  variant="filled"
                  color="primary"
                  focused
                  InputProps={{
                    style: mainStyle, // Apply the custom styles to the input element
                  }}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                      />
                    }
                    label="I accept the terms and conditions."
                    style={mainStyle}
                  ></FormControlLabel>
                </FormGroup>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 8 }}
                  style={mainStyle}
                  onClick={() => {
                    setPressedSignUp(true);
                    if (acceptTerms) {
                      const user = {
                        userName: values.userName,
                        email: values.email,
                        gender: gender,
                        phoneNumber: values.phoneNumber,
                        password: values.password,
                      };
                      if (
                        user.userName &&
                        user.email &&
                        user.phoneNumber &&
                        user.password
                      ) {
                        handleSignup(user);
                        setIsFieldEmpty(false);
                      } else {
                        setIsFieldEmpty(true);
                      }
                    } else {
                      setAcceptTerms(false);
                    }
                  }}
                >
                  Sign Up
                </Button>
                {pressedSignUp && (isFieldEmpty || !acceptTerms) && (
                  <Alert
                    variant="filled"
                    severity="error"
                    className={styles.errorAlert}
                  >
                    You must fill all the fields and accept the terms and
                    conditions!
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

export default Signup;
