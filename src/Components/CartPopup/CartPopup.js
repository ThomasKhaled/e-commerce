import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CartPopupItem from "../CartPopupItem/CartPopupItem";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import styles from "./CartPopup.module.css";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const CartPopup = ({ cartItems, isOpen, onClose, toCart }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  const cartState = useSelector((state) => state.cart);
  const handleClose = () => {
    onClose();
    console.log("s");
    setIsDialogOpen(false);
    console.log(isDialogOpen);
  };

  const handleGoToCart = () => {
    setIsDialogOpen(false);
    toCart();
  };
  return (
    <>
      <Grid container>
        <Grid item alignItems={"stretch"}>
          <Dialog
            className={styles.dialogMainContainer}
            open={isDialogOpen}
            onClose={handleClose}
          >
            <Card className={styles.dialogContainer}>
              <div className={styles.titleBox}>
                <Typography
                  className={`${styles.dialogContainer} ${styles.titleContainer}`}
                  variant="h5"
                  color="initial"
                >
                  Your Cart
                </Typography>

                <Badge
                  badgeContent={cartState.cart.length}
                  color="error"
                  className={styles.cartIcon}
                >
                  <ShoppingCartIcon />
                </Badge>
              </div>
              <DialogContent className={styles.dialogContent}>
                {cartItems.map((post) => (
                  <CartPopupItem
                    key={post.id}
                    id={post.id}
                    urlImg={post.urlImg}
                    title={post.title}
                    price={post.price}
                    qty={post.quantity}
                  />
                ))}
              </DialogContent>
              {cartState.cart.length > 0 ? (
                <>
                  <Divider className={styles.mainMargin} />
                  <Grid
                    container
                    justifyContent={"space-between"}
                    className={styles.mainSubtotal}
                  >
                    <Grid item>
                      <Typography variant="body2" color="initial">
                        Subtotal
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        color="initial"
                        className={styles.subtotal}
                      >
                        ${cartState.totalPrice.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    className={styles.mainSubtotal}
                  >
                    <Grid item>
                      <Typography variant="body2" color="initial">
                        Delivery
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        color="initial"
                        className={styles.subtotal}
                      >
                        $10
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider className={`${styles.mainMargin} ${styles.mt}`} />
                  <Grid container>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      className={styles.mainSubtotal}
                    >
                      <Grid item>
                        <Typography variant="body2" color="initial">
                          Total
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="initial"
                          className={styles.subtotal}
                        >
                          ${(cartState.totalPrice + 10).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent={"end"}>
                      <Grid item>
                        <DialogActions>
                          <Button
                            className={styles.dialogActionButtons}
                            onClick={handleClose}
                            color="primary"
                          >
                            Close
                          </Button>
                          <Button
                            className={styles.dialogActionButtons}
                            onClick={handleGoToCart}
                            color="primary"
                          >
                            Checkout
                          </Button>
                        </DialogActions>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Card>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default CartPopup;
