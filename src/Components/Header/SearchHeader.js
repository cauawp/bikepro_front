import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "./imgs/search-icon.svg";

const SearchHeader = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        <SearchIcon></SearchIcon>
      </button>
    </>
  );
};

export default SearchHeader;
