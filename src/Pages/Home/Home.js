import React from "react";
import Header from "../../Components/Header/Header";
import Hero from "./Hero/Hero";
import Explore from "./Explore/Explore";
import BestSallers from "./BestSallers/BestSallers";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header></Header>
      <section id="hero">
        <Hero></Hero>
      </section>
      <section id="explore">
        <Explore></Explore>
      </section>
      <section id="bestSallers">
        <BestSallers></BestSallers>
      </section>
    </>
  );
};

export default Home;
