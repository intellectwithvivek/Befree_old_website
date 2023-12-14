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
      <div className={styles.imageContainer}>

         <div className={styles.image1}>
         <img
          alt="Akshay"
          src={
            "https://firebasestorage.googleapis.com/v0/b/befree-prod.appspot.com/o/me.jpg?alt=media&token=11b96282-7808-4be3-9aa0-182416ca7fe6"
          }
          width={'100%'} height={'80%'} 
          />
          <p className={styles.overlayText1}>Akshay <br/>[Founder / Developer]</p>
        </div> 

        <div  className={styles.image2}>
          <img alt="Vivek" src={vivek} width={'100%'} height={'80%'} 
                  />
                  <p className={styles.overlayText2}>Vivek <br/>[Developer]</p>
        </div>
            
      </div>

      <p>{beFreeInformation["Meet the Team"]?.content}</p>
    </section>
  );
}
