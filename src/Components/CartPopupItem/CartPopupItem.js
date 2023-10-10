import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./CartPopupItem.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../Redux/Cart/cartSlice";
import { editCartQuantity } from "../../Redux/Cart/cartSlice";
import Grid from "@mui/material/Grid";
const CartPopupItem = ({ id, urlImg, title, price, qty, onClick }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const handleDecreaseAmount = () => {
    if (qty > 1) {
      dispatch(
        editCartQuantity({ itemIdToBeEdited: id, newQuantity: qty - 1 })
      );
    }
  };

  const handleIncreaseAmount = () => {
    dispatch(editCartQuantity({ itemIdToBeEdited: id, newQuantity: qty + 1 }));
  };
  return (
    <>
      <Card className={styles.itemCard}>
        <div>
          <CardMedia title={title} image={urlImg} className={styles.itemImg} />
        </div>
        <CardContent
          className={styles.itemText}
          onClick={onClick}
          sx={{ width: "100%" }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: { xs: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item xs={8} sx={{ mr: 2 }}>
              <Typography
                className={styles.itemTitle}
                gutterBottom
                variant="body2"
                component="p"
              >
                {title}
              </Typography>
            </Grid>
            <Grid
              container
              className={styles.topRowContainer}
              xs={3}
              alignItems={"center"}
              justifyContent={"space-between"}
              wrap="nowrap"
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
          </Grid>

          <CardActions>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: { xs: "row" },
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <Button
                  className={styles.button}
                  type="button"
                  onClick={handleRemoveFromCart}
                >
                  remove
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2" className={styles.itemPrice}>
                  {`$${price}`}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default CartPopupItem;
