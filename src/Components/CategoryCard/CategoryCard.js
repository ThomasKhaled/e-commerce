import React from "react";
import { useNavigate } from "react-router-dom";
import Item from "../Item/Item";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./CategoryCard.module.css";
import useAPI from "../../hooks/useAPI";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const baseURL = "https://fakestoreapi.com/products/category/";

const CategoryCard = ({ categoryUrl, categoryTitle }) => {
  const navigate = useNavigate();
  const { posts, isLoading, error } = useAPI({
    apiURL: `${baseURL}${categoryUrl}`,
  });

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="row">
        {Array.apply(null, { length: 4 }).map((e, i) => (
          <Box key={i} sx={{ pt: 0.5, marginRight: 2 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        ))}
      </Box>
    );
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!posts) return null;
  const firstFourItems = posts.slice(0, 4);

  const handleClickedItem = (
    id,
    img,
    title,
    description,
    price,
    rate,
    count,
    category
  ) => {
    navigate(`/item`, {
      state: { id, img, title, description, price, rate, count, category },
    });
  };
  return (
    <Grid container justifyContent={"center"}>
      <Grid container className={styles.listTitleContainer} sm={8}>
        <Grid item>
          <Typography
            className={styles.listTitleC}
            variant="h4"
            color="initial"
          >
            <Typography className={styles.listTitle} variant="h4" color="div">
              <span className={styles.shopFromText}>Shop from</span>{" "}
              <span className={styles.categoryName}>{categoryTitle}</span>
            </Typography>
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={styles.catViewAll} variant="body1" color="div">
            <span className={styles.viewAllText}>View All </span>
            <span className={styles.viewAllArrow}>&gt;</span>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} sm={8} justifyContent={"center"}>
        {firstFourItems.map((post) => (
          <Grid item>
            <Item
              key={post.id}
              id={post.id}
              urlImg={post.image}
              title={post.title}
              price={post.price}
              ratingValue={post.rating.rate}
              ratingCount={post.rating.count}
              onClick={() =>
                handleClickedItem(
                  post.id,
                  post.image,
                  post.title,
                  post.description,
                  post.price,
                  post.rating.rate,
                  post.rating.count,
                  post.category
                )
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CategoryCard;