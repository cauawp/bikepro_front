import React from "react";
import Header from "../../Components/Header/Header";
import Hero from "./Hero/Hero";
import Explore from "./Explore/Explore";
import BestSallers from "./BestSallers/BestSallers";
import "./Home.css";
import Loader from "../../Components/Loader/Loader";
import FindIdealBike from "./FindIdealBike/FindIdealBike";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Loader></Loader>
      <Header></Header>
      <Hero></Hero>
      <Explore></Explore>
      <BestSallers></BestSallers>
      <FindIdealBike></FindIdealBike>
      <Footer></Footer>
    </>
  );
};

export default Home;
