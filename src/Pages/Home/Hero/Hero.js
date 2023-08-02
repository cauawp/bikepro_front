import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

//IMAGES
import HeroBg1 from "./imgs/hero-bg_1.png";
import HeroBg2 from "./imgs/hero-bg_2.png";
import HeroBg3 from "./imgs/hero-bg_3.png";
import HeroBg4 from "./imgs/hero-bg_4.png";

//ICONS
import { ReactComponent as ArrowLeft } from "./imgs/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./imgs/arrow-right.svg";

const slideItems = [
  {
    id: 1,
    title: "Fique sempre na estrada com as Triathlon",
    paragraph:
      "É fácil de percorrer seus trajeto com as Triathlon com sua aerodinâmica à patamares nunca antes vistos",
    btn: "Explore as Triathlon",
    bg: HeroBg1,
  },
  {
    id: 2,
    title: "Fique sempre na estrada com as Triathlon 2",
    paragraph:
      "É fácil de percorrer seus trajeto com as Triathlon com sua aerodinâmica à patamares nunca antes vistos",
    btn: "Explore as Triathlon",
    bg: HeroBg2,
  },
  {
    id: 3,
    title: "Fique sempre na estrada com as Triathlon 3",
    paragraph:
      "É fácil de percorrer seus trajeto com as Triathlon com sua aerodinâmica à patamares nunca antes vistos",
    btn: "Explore as Triathlon",
    bg: HeroBg3,
  },
  {
    id: 4,
    title: "Fique sempre na estrada com as Triathlon 4",
    paragraph:
      "É fácil de percorrer seus trajeto com as Triathlon com sua aerodinâmica à patamares nunca antes vistos",
    btn: "Explore as Triathlon",
    bg: HeroBg4,
  },
];

const Hero = () => {
  //HOOKS//
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const slideRef = useRef();
  const slideTimerRef = useRef();

  useEffect(() => {
    const intervalSlide = setInterval(() => {
      nextSlide();
    }, 7500);
    return () => {
      clearInterval(intervalSlide);
    };
  }, [activeIndex]);

  useEffect(() => {
    const { width } = slideRef.current.getBoundingClientRect();
    setPosition(-(width * activeIndex));
  }, [activeIndex]);

  const prevSlide = (e) => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const nextSlide = (e) => {
    if (activeIndex >= slideItems.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <>
      <section id="hero">
        <div className="heroContainer">
          <div className="heroSlide">
            <div
              className="slideContainer"
              style={{ transform: `translate(${position}px)` }}
            >
              {slideItems.map((item, index, array) => (
                <div key={item.id} className={`slideItem`} ref={slideRef}>
                  <div className="slideText">
                    <h1 className="heroTitle title1">{item.title}</h1>
                    <p className="heroParagraph paragraph1">{item.paragraph}</p>
                    <Link className="heroBtn btn" to="/">
                      {item.btn}
                    </Link>
                  </div>
                  <div className="slideBg">
                    <img src={item.bg} />
                  </div>
                </div>
              ))}
            </div>
            <div className="slideNav">
              <button
                onClick={prevSlide}
                className={`navBtn ${activeIndex == 0 ? "disable" : ""}`}
                disabled={activeIndex == 0}
              >
                <ArrowLeft></ArrowLeft>
              </button>
              <button onClick={nextSlide} className="navBtn">
                <ArrowRight></ArrowRight>
              </button>
            </div>
            <div className="slideThumb">
              {slideItems.map((e, i) => (
                <div
                  key={e.id}
                  className={`thumb ${activeIndex === i ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                ></div>
              ))}
            </div>
            {slideItems.map((e, index) => (
              <div
                key={e.id}
                className={`slideTimer ${
                  index === activeIndex ? "active" : ""
                }`}
                ref={slideTimerRef}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
