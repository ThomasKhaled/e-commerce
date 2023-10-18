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
import { useDispatch } from "react-redux";
import { mergedSchemas } from "./validationSchemas";
import { validationSchemas } from "./validationSchemas";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { addToCart } from "../Redux/Cart/cartSlice";
import {
  addToFavorite,
  signUp,
} from "../Redux/Authentication/authenticationSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [signStatus, setSignStatus] = useState("sign_in");
  const [toggleVisibilityIconPassword, setToggleVisibilityIconPassword] =
    useState(false);
  const navigate = useNavigate(); // Create a history obj

  const handleSignChange = (event, newStatus) => {
    setSignStatus(newStatus);
  };

  const mainStyle = {
    color: "white",
    fontSize: "1.1rem",
    borderColor: "white",
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await initializeEmailAndPasswordUser(response.user);
      await initializeUser(response.user);
      Swal.fire({
        icon: "success",
        title: "Loggedin Successfully!",
        timer: 1500,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/main");
        }
      });
    } catch (err) {
      Swal.fire(err.message);
    } finally {
    }
  };

  const initializeEmailAndPasswordUser = async (userState) => {
    const userInfo = await getDocs(collection(db, userState.uid));

    userInfo.forEach((uInfoData) => {
      const uInfo = uInfoData.data();
      const user = {
        userName: uInfo.userName,
        email: uInfo.email,
        photo: uInfo.photoURL,
        phone: uInfo.phone,
        gender: uInfo.gender,
        uID: uInfo.uID,
      };
      dispatch(signUp(user));
    });
  };

  const initializeUser = async (response) => {
    try {
      const favRef = doc(db, response.uid, "favs"); // Reference the user's document
      const cartRef = doc(db, response.uid, "cart"); // Reference the user's document

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

  const emailSchema = validationSchemas.email;
  const passwordSchema = validationSchemas.password;
  const merged_Schemas = mergedSchemas(emailSchema, passwordSchema);
  return signStatus === "sign_up" ? (
    <Signup />
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
              email: "",
              password: "",
            }}
            validationSchema={merged_Schemas}
            onSubmit={async (values) => {
              await logInWithEmailAndPassword(values.email, values.password)
                .then(() => {})
                .catch((error) => {
                  Swal.fire(error.message);
                });
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
                <Box position={"relative"} mt={2}>
                  <Field
                    as={TextField}
                    id="password"
                    type={toggleVisibilityIconPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    fullWidth
                    variant="filled"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    color="info"
                    focused
                    InputProps={{
                      style: mainStyle, // Apply the custom styles to the input element
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
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 4 }}
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
