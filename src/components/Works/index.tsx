import React from "react";
import styles from "./index.module.css";

import work1 from "../../assets/svg/work1.svg";
import work2 from "../../assets/svg/work2.svg";
import work3 from "../../assets/svg/work3.svg";

// Components Here
const Works: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>How It Works?</h2>
        <div className={styles.content}>
          <div className={styles.card}>
            <img src={work1} alt="work 1" />
            <h2>Step 1</h2>
            <p>Login</p>
          </div>
          <div className={styles.card}>
            <img src={work2} alt="work 2" />
            <h2>Step 2</h2>
            <p>Initialize Your Account </p>
          </div>
          <div className={styles.card}>
            <img src={work3} alt="work 3" />
            <h2>Step 3</h2>
            <p>Add Offers & Reach out </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
