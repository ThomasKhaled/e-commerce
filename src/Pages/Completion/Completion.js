import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import styles from "./Completion.module.css";

const Completion = () => {
  const { buildingNo, streetName } = useSelector(
    (state) => state.auth.user.address
  );
  const totalPrice = (
    useSelector((state) => state.cart.totalPrice) + 10
  ).toFixed(2);

  return (
    <Card elevation={4} className={styles.card}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" color="initial">
          Thank you for ordering from MegaMart! 🎉
        </Typography>
        <Typography variant="body1" color="initial">
          The order will be delivered tomorrow to : "{buildingNo}-{streetName}"
        </Typography>
      </Container>
      <Divider
        color="#bbbfbf"
        sx={{ pt: 1, mb: 3, backgroundColor: "transparent" }}
      />
      <Typography variant="body2" color="initial" className={styles.center}>
        Total price :{" "}
        <span>
          <b>$ {totalPrice}</b>
        </span>
      </Typography>
    </Card>
  );
};

export default Completion;
