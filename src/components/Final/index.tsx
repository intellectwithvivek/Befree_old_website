import React from "react";
import styles from "./index.module.css";

import apple from "../../assets/svg/apple.svg";
import android from "../../assets/svg/android.svg";

// Components Here

const Final: React.FC = () => {
  const openLinkInNewPage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Become a Befree partner today</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button>
          Join Now
          <svg className={styles.link_icon}>
            <use xlinkHref="/sprite.svg#icon-chevron-right" />
          </svg>
        </button>
        <h3>Download Befree app</h3>
        <div className={styles.download}>
          <img
            src={apple}
            alt="apple"
            onClick={() =>
              openLinkInNewPage(
                "https://apps.apple.com/in/app/befree/id6463606840"
              )
            }
          />
          <img
            src={android}
            alt="android"
            onClick={() =>
              openLinkInNewPage(
                "https://play.google.com/store/apps/details?id=com.befree"
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default Final;
