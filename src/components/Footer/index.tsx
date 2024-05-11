import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./index.module.css";

import { Copyright } from "@mui/icons-material";
import white from "../../assets/svg/logo.svg";

const Footer: React.FC = () => {
  const location = useLocation();

  const handleMailClick: React.MouseEventHandler<HTMLParagraphElement> = () => {
    window.location.href = "mailto:betabefree340@gmail.com";
  };

  const openLinkInNewPage = (url) => {
    window.open(url, "_blank");
};
  return (
    <>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.logo}>
            <img src={white} alt="befree logo" />
            BeFree
          </div>

          <div className={styles.first_content}>
            <p>
            Tired of swiping on Dating Apps? Make real connections with Befree 🤩
            ... Plan your Activities or Explore the events around you.
            </p>
          </div>
          <div className={styles.logos}>
            <svg className={styles.link_icon} >
              <use xlinkHref="/sprite.svg#icon-facebook" onClick={() =>
                            openLinkInNewPage(
                                "https://www.facebook.com/profile.php?id=100095439918491"
                            )}/>
            </svg>
            {/* <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-twitter" />
            </svg>
            <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-linkedin2" />
            </svg> */}

            <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-instagram" onClick={() =>
                            openLinkInNewPage(
                                "https://www.instagram.com/befree_connect/"
                            )}/>
            </svg>
          </div>
        </div>

        <div className={styles.second}>
          <Link
            to="/"
            className={location.pathname === "/" ? styles.active : ""}
          >
            <p>Home</p>
          </Link>

          <Link
            to="/about"
            className={location.pathname === "/about" ? styles.active : ""}
          >
            <p>About</p>
          </Link>

          <Link
            to="/contact"
            className={location.pathname === "/contact" ? styles.active : ""}
          >
            <p>Contact Us</p>
          </Link>

          <Link
            to="/terms"
            className={location.pathname === "/terms" ? styles.active : ""}
          >
            <p>Terms and Conditions</p>
          </Link>

          <Link
            to="/privacy"
            className={location.pathname === "/privacy" ? styles.active : ""}
          >
            <p>Privacy Policy</p>
          </Link>
        </div>

        <div className={styles.third}>
          <div className={styles.contact}>
            <h1>Contact</h1>
            <p onClick={handleMailClick}>betabefree340@gmail.com</p>
          </div>
          <div className={styles.address}>
            <h1>Office Address</h1>
            <p>Dharbhanga Colony, Prayagraj UttarPradesh (  )</p>
          </div>

          <div className={styles.address}>
            <h1>PULSELINK INNOVATIONS Pvt. Ltd.</h1>
            <p><Copyright/> All Rights Reserved (2023-2024)</p>
          </div>
        </div>
       
      </div>

     
    </>
  );
};

export default Footer;
