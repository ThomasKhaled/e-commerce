import React, { useState, useRef, useLayoutEffect } from "react";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import styles from "./Cart.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../Layout/CartItem/CartItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { clearCart } from "../../Redux/Cart/cartSlice";
import Alert from "@mui/material/Alert";
const Cart = () => {
  const cartState = useSelector((state) => state.cart.cart);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const [isCartCleared, setIsCartCleared] = useState(false);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    if (cartState.length > 0) dispatch(clearCart());
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    let timer;

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsCartCleared(true);

    timer = setTimeout(() => {
      setIsCartCleared(false);
    }, 4000); // 5000 milliseconds = 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [cartState]);
  return (
    <Box className={styles.mainContainer}>
      <div className={`${styles.header}`}>
        <Header />
      </div>
      {isCartCleared && (
        <Alert className={styles.alertItemAdded} severity="error">
          Cart Cleared!
        </Alert>
      )}
      <Grid
        container
        spacing={2}
        marginTop={2}
        padding={10}
        direction={"column"}
        className={styles.cartGridContainer}
      >
        <Grid item>
          <Typography
            variant="h3"
            color="initial"
            component={"h1"}
            marginBottom={1}
          >
            Shopping Cart
          </Typography>
          <Grid
            className={styles.clearCart}
            item
            sx={{ display: "flex" }}
            onClick={handleClearCart}
            marginBottom={1}
          >
            <Typography
              variant="body2"
              color="initial"
              marginRight={1}
              className={styles.clearCart}
            >
              Clear Cart ({cartState.length})
            </Typography>
            <RemoveShoppingCartIcon />
          </Grid>
          <Divider />
        </Grid>
        <Grid item className={styles.cartGrid}>
          {cartState.map((product) => (
            <>
              <div className={styles.cartItem}>
                <CartItem
                  key={product.id}
                  id={product.id}
                  img={product.urlImg}
                  title={product.title}
                  price={product.price}
                />
              </div>
              <Divider className={styles.itemsDivider} />
            </>
          ))}
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          xs={12}
          className={styles.subPriceInfo}
        >
          <Typography variant="h6" color="initial" component={"span"}>
            Subtotal{" "}
            {cartState.length > 1 ? (
              <Typography variant="h6" component={"span"}>
                ({cartState.length} items)
              </Typography>
            ) : (
              <Typography variant="h6" component={"span"}>
                ({cartState.length} item)
              </Typography>
            )}
            : <span className={styles.totalPrice}>$ {cartTotalPrice}</span>
          </Typography>
        </Grid>
      </Grid>
      <div className={styles.footer}>
        <Footer></Footer>
      </div>
    </Box>
  );
};

export default Cart;
