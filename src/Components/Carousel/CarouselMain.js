import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import axios from "axios";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";

const baseURL = "https://fakestoreapi.com/products/";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(90deg, hsla(228, 35%, 28%, 1) 0%, hsla(228, 34%, 29%, 1) 44%, hsla(228, 38%, 41%, 1) 98%)",
  marginTop: "15px",
  borderRadius: "12px",
  padding: "18px",
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  marginRight: "10px",
  fontFamily: "'Nunito', sans-serif",
}));
function Item(props) {
  return (
    <StyledPaper>
      <StyledHeading variant="h5">{props.item.name}</StyledHeading>
      <Typography>{props.item.description}</Typography>
    </StyledPaper>
  );
}

const CarouselMain = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      axios.get(baseURL).then((response) => {
        setPosts(response.data);
      });
    };

    fetchData();
  }, []);

  if (!posts) return null;

  var items = [];

  for (let i = 0; i < 3; i++) {
    items.push({
      name: posts[i]?.title || "",
      description: (
        <img
          src={posts[i]?.image || ""}
          alt=""
          width={"150px"}
          height={"150px"}
        />
      ),
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Carousel
        className="carouselLAndN"
        navButtonsWrapperProps={{
          style: {
            bottom: "0px",
            top: "unset",
          },
        }}
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: "rgb(91, 182, 222)",
            color: "#ffffff",
            padding: "10px",
          },
        }}
        sx={{
          width: "90%",
          margin: 5,
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMain;
