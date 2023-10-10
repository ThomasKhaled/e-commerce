import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./CartItem.module.css";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Redux/Cart/cartSlice";
import { editCartQuantity } from "../../Redux/Cart/cartSlice";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import { LightTooltip } from "../../MUI/LightTooltip";

const CartItem = ({ id, img, title, price, quantity }) => {
  const cartState = useSelector((state) => state.cart.cart);
  const item = cartState.find((item) => item.id === id);
  useEffect(() => {
    setQty(item.quantity);
  }, [item]);

  const dispatch = useDispatch();
  const handleDeleteItemFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const [qty, setQty] = React.useState(quantity);

  const handleDecreaseAmount = () => {
    setQty((prev) => {
      const newCounter = prev - 1;
      dispatch(
        editCartQuantity({ itemIdToBeEdited: id, newQuantity: newCounter })
      );
      return newCounter;
    });
  };
  const handleIncreaseAmount = () => {
    setQty((prev) => {
      const newCounter = prev + 1;
      dispatch(
        editCartQuantity({ itemIdToBeEdited: id, newQuantity: newCounter })
      );
      return newCounter;
    });
  };

  return (
    <Grid container spacing={5} sx={{ display: "flex", alignItems: "center" }}>
      <Grid item xs={12} sm={5} md={4} lg={3} className={styles.imgGrid}>
        <img src={img} alt={title} className={styles.cartItemImg} />
      </Grid>
      <Grid
        container
        direction={"column"}
        xs={12}
        sm={7}
        md={8}
        lg={9}
        className={styles.cartItemInfo}
      >
        <Grid item>
          <Typography variant="h6" color="initial" className={styles.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" color="initial" className={styles.price}>
            <span className={styles.dollarSign}>$</span>
            {price}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="#3f8227" className={styles.status}>
            In Stock
          </Typography>
        </Grid>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center" },
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <Grid
            container
            className={styles.topRowContainer}
            xs={1}
            alignItems={"center"}
          >
            <Grid item>
              <Typography
                className={styles.decIncQty}
                type="button"
                onClick={handleDecreaseAmount}
              >
                -
              </Typography>
            </Grid>
            <Grid item sx={{ ml: 2 }}>
              <Typography
                className={styles.itemTitle}
                gutterBottom
                variant="body2"
                component="p"
              >
                {qty}
              </Typography>
            </Grid>
            <Grid item sx={{ ml: 2 }}>
              <Typography
                className={styles.decIncQty}
                type="button"
                onClick={handleIncreaseAmount}
              >
                +
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <LightTooltip title="Remove one only" placement="right">
              <Typography variant="body2" color="var(--mainColor)">
                <Link
                  variant="text"
                  className={styles.deleteItem}
                  onClick={handleDeleteItemFromCart}
                >
                  Delete
                </Link>
              </Typography>
            </LightTooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
