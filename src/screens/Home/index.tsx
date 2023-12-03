import React from "react";
import styles from "./index.module.css";

// Components Here
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Hero />
        <Footer />
      </div>
    </>
  );
};

export default Home;
