import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

import hero from "../../assets/svg/hero.png";

// Components Here

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const textToType =
    "Effortlessly create and organize various activities using our pre-set elements. From sports events to book club meetings, set up in minutes. Connect with nearby enthusiasts and join the fun!";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < textToType.length) {
        setTypedText((prev) => prev + textToType.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>A title that is short & sweet.</h1>
          <p>{typedText}</p>
          <button>
            Join Now
            <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-chevron-right" />
            </svg>
          </button>
        </div>
        <div className={styles.right}>
          <img src={hero} alt="hero" />
        </div>
      </div>
    </>
  );
};

export default Hero;
