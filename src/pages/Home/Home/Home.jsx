import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../Works/HowItWorks";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Brands></Brands>
    </div>
  );
};

export default Home;
