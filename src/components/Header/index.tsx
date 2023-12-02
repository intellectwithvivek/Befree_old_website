import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

import logo from "../../assets/svg/logo.svg";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="befree logo" onClick={handleLogoClick} />
          BeFree
        </div>

        <div className={styles.navigation}>
          <Link
            to="/"
            className={location.pathname === "/" ? styles.active : ""}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={location.pathname === "/about" ? styles.active : ""}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? styles.active : ""}
          >
            Contact Us
          </Link>
        </div>

        <button className={styles.login}>Login</button>
      </div>
    </>
  );
};

export default Header;
