import React from "react";
import styles from "./index.module.css";

// Components Here
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import Partner from "../../components/Partner";
import Works from "../../components/Works";
import FAQ from "../../components/FAQ";

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Hero />
        <Partner />
        <Works />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default Home;
