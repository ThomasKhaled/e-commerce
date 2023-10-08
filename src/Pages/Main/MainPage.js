import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./MainPage.module.css";
import CarouselMain from "../../Components/Carousel/CarouselMain";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Alert from "@mui/material/Alert";

const MainPage = () => {
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const state = useSelector((state) => state.cart.cart);

  useEffect(() => {
    // Add scroll event listener to check if the button should be visible
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGetSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    let timer;

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setIsCartUpdated(true);

    timer = setTimeout(() => {
      setIsCartUpdated(false);
    }, 2300); // 5000 milliseconds = 5 seconds
    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  const handleScroll = () => {
    // Show the button if the user has scrolled down 20 pixels or more
    if (window.scrollY > 20) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  };

  const scrollToTop = () => {
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.mainPageContainer}>
      <Fab
        color="primary"
        aria-label="scroll-to-top"
        style={{
          display: isButtonVisible ? "block" : "none",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={scrollToTop}
      >
        <KeyboardArrowUpIcon />
      </Fab>
      <div className={`${styles.header}`}>
        <Header setSearchTerm={handleGetSearchTerm} />
      </div>
      <div className={`${styles.justifyContent} ${styles.mt_5}`}>
        <CarouselMain />
      </div>
      {isCartUpdated && (
        <Alert
          className={styles.alertItemAdded}
          variant="filled"
          severity="success"
        >
          Item added to cart!
        </Alert>
      )}
      <div className={`${styles.justifyContent} ${styles.mt_5}`}>
        <CategoryCard
          categoryUrl={"men's%20clothing"}
          categoryTitle={"men's clothing"}
          searchTerm={searchTerm.toLowerCase()}
        />
      </div>
      <div className={`${styles.justifyContent} ${styles.mt_5}`}>
        <CategoryCard
          categoryUrl={"women's%20clothing"}
          categoryTitle={"women's clothing"}
          searchTerm={searchTerm.toLowerCase()}
        />
      </div>
      <div className={`${styles.justifyContent} ${styles.mt_5}`}>
        <CategoryCard
          categoryUrl={"jewelery"}
          categoryTitle={"jewelery"}
          searchTerm={searchTerm.toLowerCase()}
        />
      </div>
      <div className={`${styles.justifyContent} ${styles.mt_5}`}>
        <CategoryCard
          categoryUrl={"electronics"}
          categoryTitle={"electronics"}
          searchTerm={searchTerm.toLowerCase()}
        />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
