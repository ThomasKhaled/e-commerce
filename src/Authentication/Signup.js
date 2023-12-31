import React, { useState, useEffect } from "react";
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
import {
  addToFavorite,
  signUp,
} from "../Redux/Authentication/authenticationSlice";
import { mergedSchemas } from "./validationSchemas";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGooglePopup } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { addToCart } from "../Redux/Cart/cartSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Swal from "sweetalert2";

const Signup = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("male");
  const [signStatus, setSignStatus] = useState("sign_up");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);
  const [pressedSignUp, setPressedSignUp] = useState(false);
  const [toggleVisibilityIconPassword, setToggleVisibilityIconPassword] =
    useState(false);
  const [
    toggleVisibilityIconConfirmPassword,
    setToggleVisibilityIconConfirmPassword,
  ] = useState(false);
  const navigate = useNavigate();

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

  const handleSignup = async (user) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      ).then((data) => {
        initializeEmailAndPasswordUser({ data, user });
      });

      // Now that sethas completed, you can proceed
      handleShowSignedUpAlert();
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use)") {
        Swal.fire("Email is already in use!");
      } else {
        Swal.fire(error.message);
      }
    }
  };

  const initializeUser = async (response) => {
    try {
      const favRef = doc(db, response.user.uid, "favs"); // Reference the user's document
      const cartRef = doc(db, response.user.uid, "cart"); // Reference the user's document

      const favsSnapshot = await getDoc(favRef);
      const existingFavs = favsSnapshot.data()?.favs || [];

      const cartSnapshot = await getDoc(cartRef);
      const existingCart = cartSnapshot.data()?.cart || [];

      existingFavs.forEach((fav) => {
        dispatch(addToFavorite(fav));
      });
      existingCart.forEach((cart) => {
        dispatch(addToCart(cart));
      });
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  };

  const loginGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    if (response.user.uID !== "") {
      const user = {
        userName: response.user.displayName,
        email: response.user.email,
        photo: response.user.photoURL,
        phone: response.user.phoneNumber,
        uID: response.user.uid,
      };
      await setDoc(doc(db, `${response.user.uid}/info`), user);
      dispatch(signUp(user));
      await initializeUser(response);
      navigate("/main");
    }
  };

  const initializeEmailAndPasswordUser = async ({
    data: emailAndPassUser,
    user: u,
  }) => {
    if (emailAndPassUser.user.uid !== "") {
      const user = {
        userName: u.userName,
        email: emailAndPassUser.user.email,
        photo: emailAndPassUser.user.photoURL,
        phone: u.phoneNumber,
        gender: gender,
        uID: emailAndPassUser.user.uid,
      };
      await setDoc(doc(db, `${emailAndPassUser.user.uid}/info`), user);
    }
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
  const customRadioColor = "#5bb6de";

  const handleShowErrorAlert = () => {
    if (isFieldEmpty || !acceptTerms) {
      Swal.fire({
        icon: "error",
        title:
          "You must fill all the fields and accept the terms and conditions!",
        timer: 1500,
      });
    }
  };

  const handleShowSignedUpAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Account Registered Successfully!",
      timer: 1500,
      showConfirmButton: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        setSignStatus("sign_in");
      }
    });
  };

  return signStatus === "sign_in" ? (
    <SignIn />
  ) : (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundContainer}> </div>
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
          xs={11}
          sm={8}
          md={8}
          lg={6}
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

                <Box mt={2}>
                  <Field
                    as={TextField}
                    id="username"
                    label="Username"
                    name="userName"
                    placeholder="Username"
                    variant="filled"
                    color="info"
                    fullWidth
                    error={touched.userName && Boolean(errors.userName)}
                    helperText={touched.userName && errors.userName}
                    className={styles.test}
                    InputProps={{
                      style: mainStyle, // Apply the custom styles to the input element
                    }}
                  />
                </Box>
                <Box mt={2}>
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
                    InputProps={{
                      style: mainStyle,
                      // Apply the custom styles to the input element
                    }}
                  />
                </Box>
                <FormControl sx={{ mt: 2 }}>
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
                          control={
                            <Radio
                              color="default"
                              sx={{ color: customRadioColor }}
                            />
                          }
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={
                            <Radio
                              color="default"
                              sx={{ color: customRadioColor }}
                            />
                          }
                          label="Female"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
                <Box mt={2}>
                  <Field
                    as={TextField}
                    id="phone"
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    fullWidth
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    variant="filled"
                    color="info"
                    InputProps={{
                      style: mainStyle, // Apply the custom styles to the input element
                    }}
                  />
                </Box>
                <Box position={"relative"} mt={2}>
                  <Field
                    as={TextField}
                    id="password"
                    type={toggleVisibilityIconPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    variant="filled"
                    color="info"
                    InputProps={{
                      style: mainStyle,
                    }}
                  />
                  {toggleVisibilityIconPassword ? (
                    <VisibilityIcon
                      className={styles.visibilityIcon}
                      onClick={() => setToggleVisibilityIconPassword(false)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className={styles.visibilityIcon}
                      onClick={() => setToggleVisibilityIconPassword(true)}
                    />
                  )}
                </Box>
                <Box position={"relative"} mt={2}>
                  <Field
                    as={TextField}
                    id="confirm_password"
                    type={
                      toggleVisibilityIconConfirmPassword ? "text" : "password"
                    }
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    fullWidth
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    variant="filled"
                    color="primary"
                    InputProps={{
                      style: mainStyle, // Apply the custom styles to the input element
                    }}
                  />
                  {toggleVisibilityIconConfirmPassword ? (
                    <VisibilityIcon
                      className={styles.visibilityIcon}
                      onClick={() =>
                        setToggleVisibilityIconConfirmPassword(false)
                      }
                    />
                  ) : (
                    <VisibilityOffIcon
                      className={styles.visibilityIcon}
                      onClick={() =>
                        setToggleVisibilityIconConfirmPassword(true)
                      }
                    />
                  )}
                </Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        color="default"
                        sx={{ color: customRadioColor }}
                      />
                    }
                    label="I accept the terms and conditions."
                    style={mainStyle}
                  ></FormControlLabel>
                </FormGroup>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 2 }}
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
                        handleShowErrorAlert();
                      }
                    } else {
                      handleShowErrorAlert();
                    }
                  }}
                >
                  Sign Up
                </Button>
                <Box className={styles.loginWithGoogle}>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ marginTop: 2, marginBottom: 8 }}
                    style={mainStyle}
                    onClick={loginGoogleUser}
                  >
                    <GoogleIcon className={styles.googleIcon} />
                    Sign in with Google
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
