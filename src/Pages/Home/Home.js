import React from "react";
import Header from "../../Components/Header/Header";
import Hero from "./Hero/Hero";
import Explore from "./Explore/Explore";
import BestSallers from "./BestSallers/BestSallers";
import "./Home.css";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
  return (
    <>
      <Loader></Loader>
      <Header></Header>
      <Hero></Hero>
      <Explore></Explore>
      <BestSallers></BestSallers>
    </>
  );
};

export default Home;
