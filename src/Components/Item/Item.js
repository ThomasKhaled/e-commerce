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

const Item = ({
  id,
  urlImg,
  title,
  price,
  ratingValue,
  ratingCount,
  onClick,
}) => {
  const state = useSelector((state) => state.auth.favoriteProducts);
  const isItemFavorited = state.find((item) => item.id === id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = {
      id,
      urlImg,
      title,
      price,
      quantity: 1,
    };
    dispatch(addToCart(item));
  };

  const handleAddToFavorite = () => {
    if (!isItemFavorited) {
      const item = {
        id,
        urlImg,
        title,
        price,
      };
      dispatch(addToFavorite(item));
    } else {
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
        <LightTooltip title="Add to favorite" placement="top">
          <FavoriteBorderIcon
            className={`${styles.favorite} ${
              isItemFavorited && styles.favorited
            }`}
            onClick={handleAddToFavorite}
          />
        </LightTooltip>
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
