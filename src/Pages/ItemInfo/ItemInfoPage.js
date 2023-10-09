import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import styles from "./ItemInfoPage.module.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/cartSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../Redux/Authentication/authenticationSlice";
import Alert from "@mui/material/Alert";
import { LightTooltip } from "../../MUI/LightTooltip";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ItemInfoPage = () => {
  const dispatch = useDispatch();
  const { id, img, title, description, price, rate, count, category } =
    useLocation().state;
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const state = useSelector((state) => state.cart.cart);
  const favProductsState = useSelector((state) => state.auth.favoriteProducts);
  const isItemFavorited = favProductsState.find((item) => item.id === id);
  const [qty, setQty] = React.useState(1);

  const handleAddToCart = () => {
    const itemToAdd = {
      id,
      img,
      title,
      price,
      quantity: qty,
    };
    dispatch(addToCart(itemToAdd));
  };

  const handleAddToFavorite = () => {
    if (!isItemFavorited) {
      const item = {
        id,
        img,
        title,
        price,
      };
      dispatch(addToFavorite(item));
    } else {
      dispatch(removeFromFavorite(id));
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    let timer;

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setIsCartUpdated(true);

    timer = setTimeout(() => {
      setIsCartUpdated(false);
    }, 2000); // 5000 milliseconds = 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  useEffect(() => {
    setQty(qty);
  }, [qty]);

  const handleQuantityChange = (event) => {
    const newQty = parseInt(event.target.value);
    setQty(newQty);
  };

  return (
    <div className={styles.mainContainer}>
      <Box sx={{ pb: 10 }}>
        <Header />
      </Box>
      {isCartUpdated && (
        <Alert className={styles.alertItemAdded} severity="success">
          Item added to cart!
        </Alert>
      )}
      <Container className={styles.infoContainer}>
        <Grid container spacing={4}>
          <LightTooltip title={title}>
            <Grid item xs={12} md={6} lg={6} style={{ marginRight: "1rem" }}>
              <Paper elevation={1} className={styles.productImgContainer}>
                <img src={img} alt={title} className={styles.productImg} />
              </Paper>
            </Grid>
          </LightTooltip>
          <Grid item xs={12} md={4} lg={4}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4" color="initial">
                  {title}
                </Typography>
                <Typography variant="body2" color="Highlight">
                  Category: {category}
                </Typography>
                <Divider
                  color="#bbbfbf"
                  sx={{ pt: 1, backgroundColor: "transparent" }}
                />
              </Grid>
              <Grid item className={styles.productPrice}>
                <Grid
                  container
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Grid item>
                    <Typography variant="h5" color="initial">
                      <span
                        className={styles.dollarSign}
                        style={{ marginRight: 3 }}
                      >
                        <sup>$</sup>
                      </span>
                      <span className={styles.productPrice}>{price}</span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FavoriteBorderIcon
                      className={`${styles.favorite} ${
                        isItemFavorited && styles.favorited
                      }`}
                      onClick={handleAddToFavorite}
                    />
                  </Grid>
                </Grid>
                <Typography variant="body1" color="initial">
                  FREE Returns <br />
                  <Typography
                    variant="body2"
                    color="initial"
                    style={{ fontSize: ".7rem" }}
                  >
                    All prices include VAT.
                  </Typography>
                </Typography>
              </Grid>
              <Grid item className={styles.productDescription}>
                <Typography variant="body1" color="initial" component="p">
                  {description}
                </Typography>
              </Grid>
              <Grid container spacing={2} className={styles.productFeatures}>
                <Grid item xs={6} md={3}>
                  <LocalShippingIcon />
                  <Typography variant="body2" color="Highlight">
                    Cash on Delivery
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <KeyboardReturnIcon />
                  <Typography variant="body2" color="Highlight">
                    15 days Returnable
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <DeliveryDiningIcon />
                  <Typography variant="body2" color="Highlight">
                    Free Delivery
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <LockIcon />
                  <Typography variant="body2" color="Highlight">
                    Secure Transaction
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ pt: 3 }}>
                <LightTooltip title={styles.ratingCount}>
                  <Grid item>
                    <Box className={styles.ratingBox}>
                      <Rating
                        name="read-only"
                        value={rate}
                        precision={0.1}
                        readOnly
                      />
                      <Typography
                        className={styles.ratingCount}
                        variant="body2"
                      >{`(${count})`}</Typography>
                    </Box>
                  </Grid>
                </LightTooltip>
              </Grid>
              <Grid container className={styles.quantity_fav}>
                <Grid item>
                  <LightTooltip title="Select The Quantity" placement="right">
                    <Box sx={{ minWidth: 50, mt: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          variant="standard"
                          htmlFor="uncontrolled-native"
                        >
                          Quantity:
                        </InputLabel>
                        <NativeSelect
                          value={qty}
                          inputProps={{
                            name: "qty",
                            id: "uncontrolled-native",
                          }}
                          onChange={handleQuantityChange}
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </LightTooltip>
                </Grid>
              </Grid>
              <LightTooltip title="Add To Cart">
                <Button
                  variant="contained"
                  sx={{ mt: 5, width: "100%" }}
                  onClick={handleAddToCart}
                >
                  add to cart
                </Button>
              </LightTooltip>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ItemInfoPage;
