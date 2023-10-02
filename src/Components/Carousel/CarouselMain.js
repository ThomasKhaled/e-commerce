import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import axios from "axios";

const baseURL = "https://fakestoreapi.com/products/";

function Item(props) {
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(90deg, hsla(228, 35%, 28%, 1) 0%, hsla(228, 34%, 29%, 1) 44%, hsla(228, 38%, 41%, 1) 98%)",
        marginTop: "15px",
        borderRadius: "12px",
        padding: "18px",
      }}
    >
      <h2 style={{ color: "#ffffff", marginRight: "10px" }}>
        {props.item.name}
      </h2>

      <p>{props.item.description}</p>
    </Paper>
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

  var items = [
    {
      name: `${posts[3]?.title}`,
      description: (
        <img
          src={posts[3]?.image ?? ""}
          alt=""
          width={"150px"}
          height={"150px"}
        />
      ),
    },
    {
      name: `${posts[1]?.title}`,
      description: (
        <img
          src={posts[1]?.image ?? ""}
          alt=""
          width={"150px"}
          height={"150px"}
        />
      ),
    },
    {
      name: `${posts[4]?.title}`,
      description: (
        <img
          src={posts[4]?.image ?? ""}
          alt=""
          width={"150px"}
          height={"150px"}
        />
      ),
    },
  ];

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
          width: "65%",
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
