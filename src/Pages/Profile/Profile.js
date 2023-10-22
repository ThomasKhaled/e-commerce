import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { doc, setDoc } from "firebase/firestore";
// import {
//   updateEmail,
//   reauthenticateWithCredential,
//   EmailAuthProvider,
//   verifyBeforeUpdateEmail,
// } from "firebase/auth";
// import { db } from "../../config/firebase";
// import { auth } from "../../config/firebase";
// import { signUp } from "../../Redux/Authentication/authenticationSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useLocation } from "react-router-dom";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [bUsername, setBusername] = useState(false);
  const [bEmail, setBEmail] = useState(false);
  const [bPhone, setBPhone] = useState(false);
  const userState = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();

  // const currPass = useLocation().state;

  useEffect(() => {
    setUsername(userState.userName);
    setEmail(userState.email);
    setPhone(userState.phone);
  }, [userState.userName, userState.email, userState.phone]);

  const handleGetSearchTerm = (value) => {
    setSearchTerm(value);
  };

  // const handleEditBuserName = async (e) => {
  //   setBusername((p) => {
  //     return !p;
  //   });
  //   const saveOrEdit = e.target.innerText;
  //   if (saveOrEdit === "SAVE") {
  //     const user = {
  //       userName: username,
  //       email: userState.email,
  //       photo: userState.photo ?? "",
  //       phone: userState.phone ?? "",
  //       uID: userState.uID,
  //     };
  //     await setDoc(doc(db, `${userState.uID}/info`), user);
  //     dispatch(signUp(user));
  //   }
  // };
  // const handleEditBEmail = async (e) => {
  //   setBEmail((p) => {
  //     return !p;
  //   });

  //   const credentials = EmailAuthProvider.credential(userState.email, currPass);
  //   const saveOrEdit = e.target.innerText;

  //   if (saveOrEdit === "SAVE") {
  //     await reauthenticateWithCredential(auth.currentUser, credentials)
  //       .then(async () => {
  //         const user = {
  //           userName: userState.userName,
  //           email: email,
  //           photo: userState.photo ?? "",
  //           phone: userState.phone ?? "",
  //           uID: userState.uID,
  //         };
  //         await setDoc(doc(db, `${userState.uID}/info`), user);
  //         dispatch(signUp(user));
  //         await verifyBeforeUpdateEmail(auth.currentUser, email);
  //       })
  //       .catch(function (error) {
  //         console.error("Error reauthenticating user: " + error.message);
  //       });
  //   }
  // };
  // const handleEditBPhone = async (e) => {
  //   setBPhone((p) => {
  //     return !p;
  //   });
  //   const saveOrEdit = e.target.innerText;
  //   if (saveOrEdit === "SAVE") {
  //     const user = {
  //       userName: userState.userName,
  //       email: userState.email,
  //       photo: userState.photo ?? "",
  //       phone: phone ?? "",
  //       uID: userState.uID,
  //     };
  //     await setDoc(doc(db, `${userState.uID}/info`), user);
  //     dispatch(signUp(user));
  //   }
  // };

  return (
    <Box className={styles.mainBox}>
      <div className={`${styles.header}`}>
        <Header setSearchTerm={handleGetSearchTerm} />
      </div>
      <Container className={styles.mainContainer}>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"stretch"}
          direction={"column"}
        >
          <Grid container alignItems={"center"} direction={"column"}>
            <Grid item mb={2}>
              <Typography variant="h5" color="initial">
                Profile & Privacy
              </Typography>
            </Grid>
            <Grid item className={styles.profileIcon}>
              {userState.photo ? (
                <Box
                  component="img"
                  sx={{
                    height: 70,
                    width: 70,
                  }}
                  alt="The house from the offer."
                  src={userState.photo}
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: "3rem" }} />
              )}
            </Grid>
          </Grid>
          <Grid item mb={1}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" color="initial" mb={1}>
                  Username
                </Typography>
                <Grid item className={styles.spaceBetween}>
                  <TextField
                    disabled={!bUsername}
                    className={styles.textField}
                    id="username"
                    value={username}
                    variant={"filled"}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {/* <Button
                    variant="contained"
                    className={styles.editButton}
                    onClick={handleEditBuserName}
                  >
                    {!bUsername && "Edit"}
                    {bUsername && "Save"}
                  </Button> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item mb={1}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" color="initial" mb={1}>
                  Email
                </Typography>
                <Grid item className={styles.spaceBetween}>
                  <TextField
                    disabled={!bEmail}
                    className={styles.textField}
                    id="email"
                    value={email}
                    variant="filled"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <Button
                    variant="contained"
                    className={styles.editButton}
                    onClick={handleEditBEmail}
                  >
                    {!bEmail && "Edit"}
                    {bEmail && "Save"}
                  </Button> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item mb={1}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" color="initial" mb={1}>
                  Phone Number
                </Typography>
                <Grid item className={styles.spaceBetween}>
                  <TextField
                    disabled={!bPhone}
                    className={styles.textField}
                    id="phone"
                    value={phone}
                    variant="filled"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {/* <Button
                    variant="contained"
                    className={styles.editButton}
                    onClick={handleEditBPhone}
                  >
                    {!bPhone && "Edit"}
                    {bPhone && "Save"}
                  </Button> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <div className={styles.footer}>
        <Footer />
      </div>
    </Box>
  );
};

export default Profile;
