import React from "react";
import styles from "./index.module.css";

import logo from "../../assets/svg/logo.svg";

// Components Here

const Header: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="befree logo" />
          BeFree
        </div>

        <div className={styles.navigation}>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact Us</a>
        </div>

        <button className={styles.login}>Login</button>
      </div>
    </>
  );
};

export default Header;
