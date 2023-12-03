import React from "react";
import styles from "./index.module.css";

import card1 from "../../assets/svg/card1.svg";
import card2 from "../../assets/svg/card2.svg";
import card3 from "../../assets/svg/card3.svg";

// Components Here

const Partner: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Why should you partner with Befree?</h1>
          <p>
            Welcome to BeFree! We're all about connecting people and fostering
            local community partnerships. Your venue can be a thriving hub for
            gatherings, and our app helps users plan events. Join us in this
            exciting journey!
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <img src={card1} alt="card 1 " /> <h1>Whats unique</h1>
              <p>
                We stand out by creating real connections through events at your
                venue. Businesses like yours become the heart of local social
                experiences, giving us an innovative edge.
              </p>
            </div>

            <div className={styles.card}>
              <img src={card2} alt="card 2" /> <h1>Collaborative growth</h1>
              <p>
                Joining our early network means a collaborative growth journey.
                Your venue shapes our app's social scene, creating memorable
                user experiences and boosting your business visibility.
              </p>
            </div>

            <div className={styles.card}>
              <img src={card3} alt="card 3" /> <h1>Hand-in-hand</h1>
              <p>
                With our mutual marketing approach, we showcase your place while
                asking for app promotion at your venue. It's a two-way strategy
                for mutual growth, contributing to each other's success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;