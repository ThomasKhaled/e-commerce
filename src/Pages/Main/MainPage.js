import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./MainPage.module.css";
import CarouselMain from "../../Components/Carousel/CarouselMain";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGetSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setButtonVisible(true);
    } else {
      setButtonVisible(false);
    }
  };

  const scrollToTop = () => {
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
      {searchTerm.length === 0 ? (
        <>
          <div className={`${styles.justifyContent} ${styles.mt_5}`}>
            <CategoryCard
              categoryUrl={"category/men's%20clothing"}
              categoryTitle={"men's clothing"}
            />
          </div>
          <div className={`${styles.justifyContent} ${styles.mt_5}`}>
            <CategoryCard
              categoryUrl={"category/women's%20clothing"}
              categoryTitle={"women's clothing"}
            />
          </div>
          <div className={`${styles.justifyContent} ${styles.mt_5}`}>
            <CategoryCard
              categoryUrl={"category/jewelery"}
              categoryTitle={"jewelery"}
            />
          </div>
          <div className={`${styles.justifyContent} ${styles.mt_5}`}>
            <CategoryCard
              categoryUrl={"category/electronics"}
              categoryTitle={"electronics"}
            />
          </div>
        </>
      ) : (
        <div className={`${styles.justifyContent} ${styles.mt_5}`}>
          <CategoryCard
            categoryUrl={""}
            categoryTitle={"electronics"}
            searchTerm={searchTerm.toLowerCase()}
          />
        </div>
      )}
      <div className={styles.footer}>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainPage;
