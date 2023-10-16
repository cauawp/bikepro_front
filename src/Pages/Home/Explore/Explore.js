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
  const [index, setIndex] = useState(0);

  const modIndex = (n, m) => {
    let result = n % m;
    return result >= 0 ? result : result + m;
  };

  const prevExplore = (e) => {
    e.preventDefault();
    if (index <= 0) {
      setIndex(carrouselItems.length - 1);
    } else {
      setIndex(index - 1);
    }
    console.log(index);
  };

  const nextExplore = (e) => {
    e.preventDefault();

    setIndex((index + 1) % carrouselItems.length);
    console.log(index);
  };

  return (
    <>
      <section id="explore">
        <div className="exploreContainer">
          <div className="exploreTop">
            <div className="exploreTopContainer container">
              <h1 className="title2">Explore as bicicletas</h1>
              <div className="exploreCarrouselControll">
                <button onClick={prevExplore}>
                  <ArrowLeft />
                </button>
                <button onClick={nextExplore}>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="exploreCarrousel container">
            <div className="linearShadow"></div>
            {carrouselItems.map((item, i, array) => {
              const indexLeft = modIndex(index - 1, carrouselItems.length);
              const indexRight = modIndex(index + 1, carrouselItems.length);

              let className = "card";

              if (i === index) {
                className = "card card-active";
              } else if (i === indexRight) {
                className = "card card-right";
              } else if (i === indexLeft) {
                className = "card card-left";
              } else className = "card";

              return (
                <div key={item.id} className={className}>
                  <img src={item.img} alt="SLA" />
                  <div className="exploreText">
                    <h1>{item.title}</h1>
                    <Link className="exploreBtn btn" to="/">
                      {item.btn}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Explore;
