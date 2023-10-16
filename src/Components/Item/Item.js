import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./Item.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Cart/cartSlice";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../Redux/Authentication/authenticationSlice";
import { LightTooltip } from "../../MUI/LightTooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const Item = ({
  id,
  urlImg,
  title,
  price,
  ratingValue,
  ratingCount,
  description,
  category,
  onClick,
}) => {
  const state = useSelector((state) => state.auth.favoriteProducts);
  const userState = useSelector((state) => state.auth.user);

  const isItemFavorited = state.find((item) => item.id === id);
  const dispatch = useDispatch();

  const updateDBCart = async (item) => {
    try {
      const userDocRef = doc(db, userState.uID, "cart");
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const existingCart = userDocSnapshot.data()?.cart || [];

        existingCart.push(item);

        await setDoc(userDocRef, { cart: existingCart }, { merge: true });

        console.log("Item added to cart!");
      } else {
        await setDoc(userDocRef, { cart: [item] });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleAddToCart = async () => {
    const item = {
      id,
      urlImg,
      title,
      price,
      quantity: 1,
    };
    await updateDBCart(item);
    dispatch(addToCart(item));
  };

  const updateFavs = async (item) => {
    try {
      const userDocRef = doc(db, userState.uID, "favs");
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const existingFavs = userDocSnapshot.data()?.favs || [];

        existingFavs.push(item);

        await setDoc(userDocRef, { favs: existingFavs }, { merge: true });

        console.log("Item added to favs!");
      } else {
        await setDoc(userDocRef, { favs: [item] });
      }
    } catch (error) {
      console.error("Error adding item to favs:", error);
    }
  };

  const deleteFav = async (item) => {
    try {
      const userDocRef = doc(db, userState.uID, "favs");
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const existingFavs = userDocSnapshot.data()?.favs || [];

        const indexToDelete = existingFavs.findIndex(
          (favItem) => favItem.id === item.id
        );

        if (indexToDelete !== -1) {
          existingFavs.splice(indexToDelete, 1);
          await setDoc(userDocRef, { favs: existingFavs }, { merge: true });
        }
      }
    } catch (error) {
      console.error("Error deleting item from favs:", error);
    }
  };

  const handleAddToFavorite = async () => {
    const item = {
      id,
      urlImg,
      title,
      price,
      ratingValue,
      ratingCount,
      description,
      category,
    };
    if (!isItemFavorited) {
      await updateFavs(item);
      dispatch(addToFavorite(item));
    } else {
      await deleteFav(item);
      dispatch(removeFromFavorite(id));
    }
  };
  return (
    <Card
      sx={{ width: { xs: "200px", sm: "280px" }, height: 380 }}
      className={styles.itemCard}
    >
      <div>
        <CardMedia
          title={title}
          image={urlImg}
          className={styles.itemImg}
          sx={{ padding: "1em 1em 0 1em" }}
          onClick={onClick}
        />
        {isItemFavorited && (
          <FavoriteIcon
            className={`${styles.favorite} ${
              isItemFavorited && styles.favorited
            }`}
            onClick={handleAddToFavorite}
          />
        )}
        {!isItemFavorited && (
          <FavoriteBorderIcon
            className={`${styles.favorite} ${
              isItemFavorited && styles.favorited
            }`}
            onClick={handleAddToFavorite}
          />
        )}
      </div>
      <CardContent className={styles.itemText} onClick={onClick}>
        <Typography
          className={styles.itemTitle}
          gutterBottom
          variant="body2"
          component="p"
        >
          {title}
        </Typography>
        <Typography variant="body2" className={styles.itemPrice}>
          {`$${price}`}
        </Typography>
        <Box
          className={styles.ratingBox}
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Rating
            name="read-only"
            value={ratingValue}
            precision={0.1}
            readOnly
          />
          <Typography
            className={styles.ratingCount}
            variant="body2"
            sx={{ ml: { xs: "-75px ", sm: "15px " } }}
          >{`(${ratingCount})`}</Typography>
        </Box>
      </CardContent>
      <CardActions className={styles.itemButton}>
        <LightTooltip title={"Add To Cart"}>
          <Button type="button" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </LightTooltip>
      </CardActions>
    </Card>
  );
};

export default Item;
