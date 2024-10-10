import React from "react";
import styles from "./index.module.css";
import { colors } from "../../../constants/colors";

// Components Here

const Welcome: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>
          Welcome to BeFree - Connecting People, Creating AI-Powered
          Experiences!
        </h3>

        <div className={styles.aboutContainer}>
          <h2>About Befree</h2>
          <div>
            <h3
              style={{
                fontWeight: "500",
                color: colors.primary,
                fontSize: "2rem",
              }}
            >
              Plan Events using AI & Connect <br />
              with nearby people with enormous activities🤩.
            </h3>
            <h6>
              It's a space where users can plan events at their favorite places
              and invite others to join them. <br />
              Powered by <strong>AI</strong>, we suggest personalized activities
              to ensure the best experiences. We believe in creating meaningful
              connections and unforgettable experiences for both users and
              merchants.
            </h6>
          </div>
          <section className={styles.feature} />
        </div>

        <div className={styles.innerContainer}>
          <h2>Our Mission</h2>
          <section className={styles.mission}>
            <div className={styles.mission_img}>
              <img src={require("../../../assets/images/mission.png")} />
            </div>

            <p>
              Our mission is to revolutionize the way people experience their
              cities. By harnessing <strong>AI</strong>, we provide a platform
              where users can discover personalized deals, plan, and host
              events. We're shaping a community where connections flourish, and
              experiences are cherished.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Welcome;
