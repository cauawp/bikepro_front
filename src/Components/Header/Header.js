import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { ReactComponent as Logo } from "./imgs/logo.svg";

//ICONS
import { ReactComponent as CartIcon } from "./imgs/cart-icon.svg";
import { ReactComponent as HearthIcon } from "./imgs/hearth-icon.svg";
import { ReactComponent as PersonIcon } from "./imgs/person-icon.svg";
import { ReactComponent as SearchIcon } from "./imgs/search-icon.svg";

const Header = (props) => {
  return (
    <>
      <div id="mainHeader">
        <div className="headerContainer">
          <Link to="/" id="mainLogo">
            <Logo></Logo>
          </Link>
          <nav id="navMenu">
            <ul className="navList">
              <li className="listLink sub-title1">
                <Link to="#">Bicicletas</Link>
              </li>
              <li className="listLink sub-title1">
                <Link to="#">E-Bikes</Link>
              </li>
              <li className="listLink sub-title1">
                <Link to="#">Equipamentos</Link>
              </li>
              <li className="listLink sub-title1">
                <Link to="#">Outlet</Link>
              </li>
            </ul>
          </nav>
          <div className="headerIcons">
            <div>
              <SearchIcon></SearchIcon>
            </div>
            <Link to="/login">
              <PersonIcon></PersonIcon>
            </Link>
            <div>
              <CartIcon></CartIcon>
            </div>
            <div>
              <HearthIcon></HearthIcon>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
