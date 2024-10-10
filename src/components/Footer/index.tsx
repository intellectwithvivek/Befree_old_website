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
              Tired of swiping? BeFree's{" "}
              <strong>Artificial Intelligence</strong> suggests personalized
              activities based on your interests and location. Meet new people,
              join local events, or host your own—experience authentic
              interactions and build lasting connections with like-minded
              individuals in your community!
            </p>
          </div>
          <div className={styles.logos}>
            <svg className={styles.link_icon}>
              <use
                xlinkHref="/sprite.svg#icon-facebook"
                onClick={() =>
                  openLinkInNewPage(
                    "https://www.facebook.com/profile.php?id=100095439918491"
                  )
                }
              />
            </svg>
            {/* <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-twitter" />
            </svg>
            <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-linkedin2" />
            </svg> */}

            <svg className={styles.link_icon}>
              <use
                xlinkHref="/sprite.svg#icon-instagram"
                onClick={() =>
                  openLinkInNewPage("https://www.instagram.com/befree_connect/")
                }
              />
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
            <p onClick={handleMailClick}>pulselink@thebefree.com</p>
          </div>
          <br />
          <div className={styles.address}>
            <h1>Office Address</h1>
            <p>Fourth Floor Rameshwar Dayal Complex</p>
            <p>Noida U.P (201301)</p>
          </div>
          <br />
          <div className={styles.address}>
            <a
              href="https://pulselink.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "orange",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              PULSELINK INNOVATIONS Pvt. Ltd.
            </a>

            <h1>AI Startup Company</h1>
            <p>
              <Copyright /> All Rights Reserved (2024-2025)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
