import React from "react";
import styles from "./index.module.css";

// Components Here
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import Partner from "../../components/Partner";
import Works from "../../components/Works";
import FAQ from "../../components/FAQ";
import Final from "../../components/Final";

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Hero />
        <Partner />
        <Works />
        <FAQ />
        <Final />
        <Footer />
      </div>
    </>
  );
};

export default Home;
