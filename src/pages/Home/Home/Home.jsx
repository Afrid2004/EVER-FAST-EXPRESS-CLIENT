import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../Works/HowItWorks";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";
import Support from "../Support/Support";
import Marchent from "../Marchent/Marchent";
import Reviews from "../Reviews/Reviews";
import FAQ from "../FAQ/FAQ";

const reviewPromise = fetch("/Data/Reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <main>
      <div className="flex flex-col gap-5">
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <Services></Services>
        <Brands></Brands>
        <Support></Support>
        <Marchent></Marchent>
        <Reviews reviewPromise={reviewPromise}></Reviews>
        <FAQ></FAQ>
      </div>
    </main>
  );
};

export default Home;
