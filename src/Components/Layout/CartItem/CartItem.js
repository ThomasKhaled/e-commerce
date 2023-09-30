import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./CartItem.module.css";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../Redux/Cart/cartSlice";

const CartItem = ({ id, img, title, price }) => {
  const dispatch = useDispatch();
  const handleDeleteItemFromCart = () => {
    dispatch(removeFromCart(id));
  };
  return (
    <Grid container spacing={5} sx={{ display: "flex", alignItems: "center" }}>
      <Grid item xs={12} sm={3} md={1} lg={1} className={styles.imgGrid}>
        <img src={img} alt={title} className={styles.cartItemImg} />
      </Grid>
      <Grid
        container
        direction={"column"}
        xs={12}
        sm={7}
        md={8}
        lg={10}
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
        <Grid container xs={12} sm={12} md={12} lg={12}>
          <Grid item>
            <Typography variant="body2" color="var(--mainColor)">
              <Link
                variant="text"
                className={styles.deleteItem}
                onClick={handleDeleteItemFromCart}
              >
                Delete
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
