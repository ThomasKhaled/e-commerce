import React, { useEffect, useState, useCallback } from "react";
import styles from "./ShippingAddressForm.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import defaultData from "../../utils/defaultData";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../Redux/Authentication/authenticationSlice";
import { toast } from "react-toastify";

const ShippingAddressForm = ({ fullAddressExists }) => {
  const [country, setCountry] = useState("");
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [streetName, setStreetName] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [landmark, setLandmark] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const userState = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleFullName = (e) => {
    setFullname(e.target.value);
  };

  const handleMobileNumber = (e) => {
    setMobile(e.target.value);
  };

  const handleStreetName = (e) => {
    setStreetName(e.target.value);
  };

  const handleBuildingNo = (e) => {
    setBuildingNo(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleFieldIsEmptyToast = () => {
    toast.error("You cant leave any field empty!", {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      closeButton: true,
      autoClose: 1000,
    });
  };

  const handleAddressSaved = () => {
    toast.success("Address Was Added Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      closeButton: true,
      autoClose: 1000,
    });
  };

  const initializeUserAddress = useCallback(async () => {
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

      setCountry(country);
      setFullname(fullname);
      setMobile(mobile);
      setStreetName(streetName);
      setBuildingNo(buildingNo);
      setCity(city);
      setDistrict(district);
      setLandmark(landmark);
      setCountryCode(countryCode);
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  }, [userState.uID]);

  useEffect(() => {
    initializeUserAddress();
  }, [initializeUserAddress]);

  const addAddressToUser = (address) => {
    const user = {
      userName: userState.userName,
      email: userState.email,
      photo: userState.photoURL,
      phone: userState.phone,
      uID: userState.uID,
      address,
    };
    dispatch(signUp(user));
  };

  const saveAddressToDB = async () => {
    if (
      !country ||
      !fullname ||
      !mobile ||
      !streetName ||
      !buildingNo ||
      !countryCode ||
      !city ||
      !district ||
      !landmark
    ) {
      handleFieldIsEmptyToast();
      return;
    }
    const address = {
      country: country,
      fullname,
      countryCode,
      mobile,
      streetName,
      buildingNo,
      city,
      district,
      landmark,
    };
    const ref = `${userState.uID}/address`;
    await setDoc(doc(db, ref), { address: address });
    addAddressToUser(address);
    fullAddressExists(address);
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();
    await saveAddressToDB().then(() => {
      handleAddressSaved();
    });
  };

  return (
    <Box>
      <Container>
        <Typography
          variant="h6"
          color="initial"
          display={"flex"}
          justifyContent={"center"}
          marginTop={2}
        >
          Add your Address
        </Typography>
        <form onSubmit={handleSaveAddress}>
          <FormControl
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
            }}
            variant="filled"
          >
            <InputLabel
              className={styles.spacingBetweenElements}
              id="demo-simple-select-country-label"
            >
              Country
            </InputLabel>
            <Select
              fullWidth
              className={styles.spacingBetweenElements}
              labelId="demo-simple-select-country-label"
              id="demo-simple-select-country"
              value={country}
              label="Country"
              onChange={handleCountryChange}
            >
              {defaultData.country_list.map((country) => (
                <MenuItem value={country}>{country}</MenuItem>
              ))}
            </Select>

            <TextField
              className={styles.spacingBetweenElements}
              id="outlined-basic"
              label="Full name (First and Last name)"
              variant="outlined"
              fullWidth
              value={fullname}
              onChange={handleFullName}
            />

            <Grid container sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <Grid item>
                <Select
                  fullWidth
                  className={styles.spacingBetweenElements}
                  value={countryCode}
                  label="Country"
                  onChange={handleCountryCodeChange}
                >
                  {defaultData.countries.map((country) => (
                    <MenuItem value={country.code}>
                      {`${country.code}`}
                      <span style={{ marginLeft: "50px" }}>{country.name}</span>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item sx={{ ml: { xs: "0", sm: "15px" } }}>
                <TextField
                  className={styles.spacingBetweenElements}
                  id="outlined-basic"
                  label="Mobile number"
                  variant="outlined"
                  inputMode="numeric"
                  fullWidth
                  value={mobile}
                  onChange={handleMobileNumber}
                />
              </Grid>
            </Grid>
            <TextField
              className={styles.spacingBetweenElements}
              label="Street name"
              variant="outlined"
              fullWidth
              value={streetName}
              onChange={handleStreetName}
            />
            <TextField
              className={styles.spacingBetweenElements}
              label="Building name/no"
              variant="outlined"
              fullWidth
              value={buildingNo}
              onChange={handleBuildingNo}
            />
            <TextField
              className={styles.spacingBetweenElements}
              label="City/Area"
              variant="outlined"
              fullWidth
              value={city}
              onChange={handleCity}
            />
            <TextField
              className={styles.spacingBetweenElements}
              label="District"
              variant="outlined"
              fullWidth
              value={district}
              onChange={handleDistrict}
            />
            <TextField
              className={styles.spacingBetweenElements}
              label="Nearest landmark"
              variant="outlined"
              fullWidth
              value={landmark}
              onChange={handleLandmark}
            />
            <Grid item display={"flex"} justifyContent={"center"}>
              <Button
                className={styles.spacingBetweenElements}
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

export default ShippingAddressForm;
