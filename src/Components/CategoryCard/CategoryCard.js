import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "../Item/Item";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./CategoryCard.module.css";
import useAPI from "../../hooks/useAPI";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { LightTooltip } from "../../MUI/LightTooltip";
import { useLocation } from "react-router-dom";

const baseURL = "https://fakestoreapi.com/products/";

const CategoryCard = ({ categoryUrl, categoryTitle, searchTerm = "" }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const { posts, isLoading, error, filteredProducts } = useAPI({
    apiURL: `${baseURL}${categoryUrl}`,
    searchTerm: searchTerm,
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

  const handleViewAll = () => {
    navigate("/view_all_category", { state: { categoryTitle, categoryUrl } });
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!posts) return null;
  let firstFourItems;

  if (location !== "/view_all_category") {
    firstFourItems = posts.slice(0, 4);
  } else {
    firstFourItems = posts;
  }

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
      {!searchTerm && (
        <>
          <Grid container className={styles.listTitleContainer} sm={8}>
            <Grid item>
              <Typography
                className={styles.listTitleC}
                variant="h4"
                color="initial"
              >
                <Typography
                  className={styles.listTitle}
                  variant="h4"
                  color="div"
                >
                  <span className={styles.shopFromText}>Shop from</span>{" "}
                  <span className={styles.categoryName}>{categoryTitle}</span>
                </Typography>
              </Typography>
            </Grid>
            {location !== "/view_all_category" && (
              <Grid item onClick={handleViewAll}>
                <LightTooltip title={`Browse ${categoryTitle}`}>
                  <Typography
                    className={styles.catViewAll}
                    variant="body1"
                    color="div"
                  >
                    <span className={styles.viewAllText}>View All </span>
                    <span className={styles.viewAllArrow}>&gt;</span>
                  </Typography>
                </LightTooltip>
              </Grid>
            )}
          </Grid>
          <Grid
            className={styles.itemContainer}
            container
            spacing={4}
            sm={8}
            justifyContent={"center"}
          >
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
                  description={post.description}
                  category={post.category}
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
        </>
      )}
      {searchTerm &&
        filteredProducts.map((post) => (
          <Grid
            container
            spacing={4}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            justifyContent={"center"}
            sx={{ mb: 5, mr: 3 }}
          >
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
          </Grid>
        ))}
    </Grid>
  );
};

export default CategoryCard;
