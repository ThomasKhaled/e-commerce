import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./ViewAllCategory.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllCategory = () => {
  const state = useLocation().state;
  const [searchTerm, setSearchTerm] = useState("");

  const handleGetSearchTerm = (value) => {
    setSearchTerm(value);
  };
  return (
    <div className={styles.mainPageContainer}>
      <div className={`${styles.header}`}>
        <Header setSearchTerm={handleGetSearchTerm} />
      </div>
      <ToastContainer />
      {searchTerm.length === 0 ? (
        <div className={`${styles.justifyContent} ${styles.mt_5}`}>
          <CategoryCard
            categoryUrl={state.categoryUrl}
            categoryTitle={state.categoryTitle}
          />
        </div>
      ) : (
        <div className={`${styles.justifyContent} ${styles.mt_5}`}>
          <CategoryCard
            categoryUrl={state.categoryUrl}
            categoryTitle={state.categoryTitle}
            searchTerm={searchTerm.toLowerCase()}
          />
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ViewAllCategory;
