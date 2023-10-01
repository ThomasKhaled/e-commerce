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
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/cartSlice";

const Item = ({
  id,
  urlImg,
  title,
  price,
  ratingValue,
  ratingCount,
  onClick,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = {
      id,
      urlImg,
      title,
      price,
    };
    dispatch(addToCart(item));
  };
  return (
    <Card sx={{ width: 280, height: 380 }} className={styles.itemCard}>
      <CardMedia
        title={title}
        image={urlImg}
        className={styles.itemImg}
        sx={{ padding: "1em 1em 0 1em" }}
        onClick={onClick}
      />
      <CardContent className={styles.itemText} onClick={onClick}>
        <Typography
          className={styles.itemtitle}
          gutterBottom
          variant="body2"
          component="p"
        >
          {title}
        </Typography>
        <Typography variant="body2" className={styles.itemPrice}>
          {`$${price}`}
        </Typography>
        <Box className={styles.ratingBox}>
          <Rating
            name="read-only"
            value={ratingValue}
            precision={0.1}
            readOnly
          />
          <Typography
            className={styles.ratingCount}
            variant="body2"
          >{`(${ratingCount})`}</Typography>
        </Box>
      </CardContent>
      <CardActions className={styles.itemButton}>
        <Button type="button" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
