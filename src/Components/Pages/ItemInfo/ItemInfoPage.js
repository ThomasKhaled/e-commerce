import React, { useState, useLayoutEffect, useRef } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
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
import Alert from "@mui/material/Alert";

const ItemInfoPage = () => {
  const dispatch = useDispatch();
  const { id, img, title, description, price, rate, count, category } =
    useLocation().state;
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const state = useSelector((state) => state.cart.cart);
  const handleAddToCart = () => {
    const item = {
      id,
      img,
      title,
      price,
    };
    dispatch(addToCart(item));
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
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
          <Grid item xs={12} md={6} lg={6} style={{ marginRight: "1rem" }}>
            <Paper elevation={1} className={styles.productImgContainer}>
              <img src={img} alt={title} className={styles.productImg} />
            </Paper>
          </Grid>
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
                <Typography variant="h5" color="initial">
                  <span
                    className={styles.dollarSign}
                    style={{ marginRight: 3 }}
                  >
                    <sup>$</sup>
                  </span>
                  <span className={styles.productPrice}>{price}</span>
                </Typography>
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
              </Grid>
              <Button
                variant="contained"
                sx={{ mt: 5, width: "100%" }}
                onClick={handleAddToCart}
              >
                add to cart
              </Button>
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
