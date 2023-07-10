import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

//IMAGES
import ExploreImg1 from "./imgs/explore-img_1.png";
import ExploreImg2 from "./imgs/explore-img_2.png";
import ExploreImg3 from "./imgs/explore-img_3.png";

//ICONS
import { ReactComponent as ArrowLeft } from "./imgs/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./imgs/arrow-right.svg";

const carrouselItems = [
  {
    id: 1,
    title: "Montanha",
    btn: "Explore Montanha",
    img: ExploreImg1,
  },
  {
    id: 2,
    title: "Estrada",
    btn: "Explore Estrada",
    img: ExploreImg2,
  },
  {
    id: 3,
    title: "Urbano",
    btn: "Explore Urbano",
    img: ExploreImg3,
  },
];

const Explore = () => {
  return (
    <>
      <sextion id="explore">
        <div className="exploreContainer container">
          <h1 className="title2">Explore as bicicletas</h1>
          <div className="exploreCarrouselControll">
            <button onClick={scrollLeft}>
              PREV
              <ArrowLeft />
            </button>
            <button onClick={scrollRight}>
              NEXT
              <ArrowRight />
            </button>
          </div>
          <div className="exploreCarrousel">
            {carrouselItems.map((item, index, array) => (
              <div key={item.id} className={`exploreItem`}>
                <img src={item.img} alt="SLA" />
                <div className="exploreText">
                  <h1>{item.title}</h1>
                  <Link to="/">{item.btn}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </sextion>
    </>
  );
};

export default Explore;
