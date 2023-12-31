import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import styles from "./Cart.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../Components/CartItem/CartItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { clearCart } from "../../Redux/Cart/cartSlice";
import { LightTooltip } from "../../MUI/LightTooltip";
import Swal from "sweetalert2";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartState = useSelector((state) => state.cart);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleGetSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const clearDBCart = async () => {
    try {
      const userDocRef = doc(db, userState.uID, "cart");
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        await setDoc(userDocRef, { cart: [] }, { merge: true });
      } else {
        await setDoc(userDocRef, { cart: [] });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleClearCart = () => {
    handleShowCartClearedAlert();
    if (cartState.cart.length > 0) {
      dispatch(clearCart());
      clearDBCart();
    }
  };

  const handleShowCartClearedAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Cart Cleared Successfully!",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/main", { replace: true });
  };

  const handleProceedToBuy = () => {
    navigate("/buy");
  };

  return (
    <Box className={styles.mainContainer}>
      <div className={`${styles.header}`}>
        <Header setSearchTerm={handleGetSearchTerm} />
      </div>
      {searchTerm.length === 0 ? (
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
              className={styles.title}
            >
              Shopping Cart
            </Typography>
            <LightTooltip title="Empty the cart!" placement="bottom-start">
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
                  Clear Cart ({cartState.cart.length})
                </Typography>
                <RemoveShoppingCartIcon />
              </Grid>
            </LightTooltip>
            <Divider />
          </Grid>
          <Grid item className={styles.cartGrid}>
            {cartState.cart.map((product) => (
              <>
                <div className={styles.cartItem}>
                  <CartItem
                    key={product.id}
                    id={product.id}
                    img={product.urlImg}
                    title={product.title}
                    price={product.price}
                    quantity={product.quantity}
                  />
                </div>
                <Divider className={styles.itemsDivider} />
              </>
            ))}
          </Grid>
          <Grid
            container
            alignItems={"flex-end"}
            flexDirection={"column"}
            xs={12}
            className={styles.subPriceInfo}
          >
            <Grid item>
              <Typography variant="h6" color="initial" component={"span"}>
                Subtotal{" "}
                {cartState.cart.length > 1 ? (
                  <Typography variant="h6" component={"span"}>
                    ({cartState.cart.length} items)
                  </Typography>
                ) : (
                  <Typography variant="h6" component={"span"}>
                    ({cartState.cart.length} item)
                  </Typography>
                )}
                :{" "}
                <span className={styles.totalPrice}>
                  $ {+cartTotalPrice.toFixed(2)}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="initial" component={"span"}>
                Delivery{" "}
                {cartState.cart.length > 1 ? (
                  <Typography variant="h6" component={"span"}>
                    ({cartState.cart.length} items)
                  </Typography>
                ) : (
                  <Typography variant="h6" component={"span"}>
                    ({cartState.cart.length} item)
                  </Typography>
                )}
                :
                {cartState.cart.length === 0 ? (
                  <span className={styles.totalPrice}>$ {0}</span>
                ) : (
                  <span className={styles.totalPrice}>$ {10}</span>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={styles.proceedToBuyButton}
                variant="contained"
                onClick={handleProceedToBuy}
              >
                Proceed to Buy
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div className={`${styles.justifyContent} ${styles.mt_5}`}>
          <CategoryCard
            categoryUrl={""}
            categoryTitle={"electronics"}
            searchTerm={searchTerm.toLowerCase()}
          />
        </div>
      )}

      <div className={styles.footer}>
        <Footer></Footer>
      </div>
    </Box>
  );
};

export default Cart;
