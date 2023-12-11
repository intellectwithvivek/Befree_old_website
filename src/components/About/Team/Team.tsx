import React from "react";
import {
  addPlaceInstructions,
  beFreeInformation,
} from "../../../constants/app_constants";
import vivek from "../../../assets/images/vivek_image.jpeg";

import styles from "./team.module.css";

type Props = {};

export default function Team({}: Props) {
  return (
    <section className={styles.teamcontainer}>
      <h2>Meet the Team</h2>
      <div>
        <img
          alt="Akshay"
          src={
            "https://firebasestorage.googleapis.com/v0/b/befree-prod.appspot.com/o/me.jpg?alt=media&token=11b96282-7808-4be3-9aa0-182416ca7fe6"
          }
          width={300}
          height={300}
        />
        <p>{beFreeInformation["Meet the Team"]?.content}</p>
      </div>

      <div>
        <img alt="Vivek" src={vivek} width={300} height={300} />
        <p>
          Meet Vivek Kumar Singh, the technological virtuoso at the heart of
          BeFree. As a dedicated software engineer, Vivek contributes his
          expertise to ensure the seamless and innovative functionality of our
          platform. With a passion for coding and a commitment to excellence,
          Vivek plays a pivotal role in shaping the technological landscape of
          BeFree. Get ready to experience events like never before, thanks to
          Vivek's skillful craftsmanship. Welcome to the technological
          brilliance of BeFree, crafted by Vivek Kumar Singh.
        </p>
      </div>
    </section>
  );
}
