import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { ReactComponent as Logo } from "./imgs/logo.svg";

//ICONS
import { ReactComponent as CartIcon } from "./imgs/cart-icon.svg";
import { ReactComponent as HearthIcon } from "./imgs/hearth-icon.svg";
import { ReactComponent as PersonIcon } from "./imgs/person-icon.svg";
import SearchHeader from "./SearchHeader";

const Header = (props) => {
  const [headerHide, setHeaderHide] = useState(false);
  const [looking, setLooking] = useState(false);

  console.log(looking);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setHeaderHide(prevScrollPos < currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");

  return (
    <>
      <div
        id="mainHeader"
        className={`${props.headerClass} ${headerHide ? "hidden" : ""} ${
          looking ? "looking" : ""
        }`}
      >
        <div className="headerContainer">
          <Link to="/" id="mainLogo">
            <Logo></Logo>
          </Link>
          <nav id="navMenu">
            <ul className="navList">
              <li className="listLink sub-title1">
                <Link to="#">Bicicletas</Link>
              </li>
              {/*<li className="listLink sub-title1">
                <Link to="#">E-Bikes</Link>
                </li>*/}
              <li className="listLink sub-title1">
                <Link to="#">Equipamentos</Link>
              </li>
              {/*<li className="listLink sub-title1">
                <Link to="#">Outlet</Link>
                </li>*/}
            </ul>
          </nav>
          <div className="headerIcons">
            <SearchHeader onClick={() => setLooking(true)}></SearchHeader>
            <Link to={storedUserId !== null ? "/conta" : "/login"}>
              <PersonIcon></PersonIcon>
            </Link>
            <Link to={`/carrinho`}>
              <CartIcon></CartIcon>
            </Link>
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
