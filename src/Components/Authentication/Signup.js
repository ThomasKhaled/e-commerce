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
import * as Yup from "yup";
import { useDispatch } from "react-redux/";
import { signUp } from "../Redux/Authentication/authenticationSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("male");
  const [signStatus, setSignStatus] = useState("sign_up");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignChange = (event, newStatus) => {
    setSignStatus(newStatus);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const textFieldColor = {
    color: "white",
    fontSize: "1.1rem",
    borderColor: "white",
  };

  const handleSignup = (user) => {
    dispatch(signUp(user));
    setSignStatus("sign_in");
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ), // Ensure it matches the 'password' field.required('Please confirm your password'),
  });

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
            validationSchema={validationSchema}
            onSubmit={(values) => {}}
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
                      Sign Up
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="initial"
                      style={textFieldColor}
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
                  error={
                    props.touched.userName && Boolean(props.errors.userName)
                  }
                  helperText={props.touched.userName && props.errors.userName}
                  className={styles.test}
                  InputProps={{
                    style: textFieldColor, // Apply the custom styles to the input element
                  }}
                />
                <Field
                  as={TextField}
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  error={props.touched.email && Boolean(props.errors.email)}
                  helperText={props.touched.email && props.errors.email}
                  placeholder="Email"
                  fullWidth
                  variant="filled"
                  color="info"
                  focused
                  InputProps={{
                    style: textFieldColor, // Apply the custom styles to the input element
                  }}
                />
                <FormControl margin="normal">
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    style={textFieldColor}
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={handleGenderChange}
                    style={textFieldColor}
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
                  error={
                    props.touched.phoneNumber &&
                    Boolean(props.errors.phoneNumber)
                  }
                  helperText={
                    props.touched.phoneNumber && props.errors.phoneNumber
                  }
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
                  margin="normal"
                  error={
                    props.touched.password && Boolean(props.errors.password)
                  }
                  helperText={props.touched.password && props.errors.password}
                  variant="filled"
                  color="info"
                  focused
                  InputProps={{
                    style: textFieldColor, // Apply the custom styles to the input element
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
                    props.touched.confirmPassword &&
                    Boolean(props.errors.confirmPassword)
                  }
                  helperText={
                    props.touched.confirmPassword &&
                    props.errors.confirmPassword
                  }
                  variant="filled"
                  color="primary"
                  focused
                  InputProps={{
                    style: textFieldColor, // Apply the custom styles to the input element
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
                    style={textFieldColor}
                  ></FormControlLabel>
                </FormGroup>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  style={textFieldColor}
                  onClick={() => {
                    if (acceptTerms) {
                      const user = {
                        userName: props.values.userName,
                        email: props.values.email,
                        gender: gender,
                        phoneNumber: props.values.phoneNumber,
                        password: props.values.password,
                      };
                      handleSignup(user);
                    } else {
                      throw new Error("error!");
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
