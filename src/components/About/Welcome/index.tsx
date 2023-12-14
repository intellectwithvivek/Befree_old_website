import React from "react";
import styles from "./index.module.css";
import { colors } from "../../../constants/colors";

// Components Here

const Welcome: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>
          Welcome to BeFree - Connecting People, Creating Experiences!
        </h3>

        <div className={styles.aboutContainer}>
          <h2>About Befree</h2>
          <div>
            <h3 style={{fontWeight:'500',color:colors.primary,fontSize:'2rem'}}>
              Plan Events & Connect <br />
              with nearby people with enormous activities🤩.
            </h3>
            <h6>
              It's a space where users can plan events at their favorite places
              and invite others to join them. <br />
              We believe in creating meaningful connections and unforgettable
              experiences for both users and merchants.
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
              cities. By providing a platform where users can not only discover
              great deals but also plan and host events, we're shaping a
              community where connections flourish, and experiences are
              cherished.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Welcome;
