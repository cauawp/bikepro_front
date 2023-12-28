import React from "react";

import BannerLeft from "./imgs/banner-img_left.png";
import BannerRight from "./imgs/banner-img_right.png";

import "./Banners.css";

const Banners = () => {
  return (
    <>
      <section id="banners">
        <div className="bannersContainer container">
          <div className="bannerLeft">
            <div className="bannerTextContainer left">
              <h1 className="title2">Ultimate</h1>
              <p className="paragraph1">
                A Clássica bicicleta de corrida versátil, com inúmeras vitorias
                profissionais. Leveza, aerodinamica e conforto numa única
                bicicleta
              </p>
              <a href="" className="btn">
                Explore as Ultimate
              </a>
            </div>
            <img src={BannerLeft} alt="" />
          </div>
          <div className="bannerRight">
            <div className="bannerTextContainer right">
              <h1 className="title2">Torque</h1>
              <p className="paragraph1">
                Donwnhill, enduro, freeride. Com 180 mm de curso e uma suave
                sistema de suspensão para que possa fazer o que quiser
              </p>
              <a href="" className="btn">
                Explore as Torque
              </a>
            </div>
            <img src={BannerRight} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banners;
