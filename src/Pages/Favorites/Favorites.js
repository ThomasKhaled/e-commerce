import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./Favorites.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Container from "@mui/material/Container";
import Item from "../../Components/Item/Item";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Favorites = () => {
  const state = useSelector((state) => state.auth.favoriteProducts);
  const navigate = useNavigate();

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
    <Box className={styles.listTitleContainer}>
      <div className={`${styles.header}`}>
        <Header />
      </div>
      <Container className={styles.itemsContainer}>
        <Typography textAlign={"center"} variant="h2" color="initial">
          Favorites
        </Typography>
        <Grid container spacing={4} sm={12} justifyContent={"center"} mt={1}>
          {state.map((post) => (
            <Grid item>
              <Item
                key={post.id}
                id={post.id}
                urlImg={post.urlImg}
                title={post.title}
                price={post.price}
                ratingValue={post.ratingValue}
                ratingCount={post.ratingCount}
                description={post.description}
                category={post.category}
                onClick={() =>
                  handleClickedItem(
                    post.id,
                    post.urlImg,
                    post.title,
                    post.description,
                    post.price,
                    post.ratingValue,
                    post.ratingCount,
                    post.category
                  )
                }
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className={styles.footer}>
        <Footer />
      </div>
    </Box>
  );
};

export default Favorites;
