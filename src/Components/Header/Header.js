import React from "react";
import PrimarySearchAppBar from "../../MUI/AppBar";

const Header = ({ setSearchTerm }) => {
  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <PrimarySearchAppBar setSearchTerm={handleSearchTermChange} />
    </>
  );
};

export default Header;
