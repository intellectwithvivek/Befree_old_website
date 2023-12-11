import React from "react";
import styles from "./index.module.css";
import { beFreeInformation } from "../../constants/app_constants";
import Lottie from 'react-lottie';
import mission  from '../../assets/lottie/mission.json'
import Faq from "../../components/About/Faq/Faq";
import Team from "../../components/About/Team/Team";
import Footer from "../../components/Footer";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: mission,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };


// Components Here
const About: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>Welcome to BeFree - Connecting People, Creating Experiences!</h3>


        <div className={styles.aboutContainer}>
          <h2>About Befree</h2>
            <div>
            <h3 style={{ color: "#2c2c2cd1" }}>Plan & Connect <br />
            with Enormous Activities that blow your Mind</h3>
            <h6>It's a space where users can plan events at their favorite places and invite others to join them. <br />We believe in creating meaningful connections and unforgettable experiences for both users and merchants.</h6>
            </div>
          <section className={styles.feature}/>
        </div>

        <div className={styles.innerContainer}>
        <h4>Our Mission</h4>
        <section className={styles.mission}>
              <div>
                <img
                 src={require('../../assets/images/mission.png')}/>
              </div>

                  <p>Our mission is to revolutionize the way people experience their cities. By providing a platform where users can not only discover great deals but also plan and host events, we're shaping a community where connections flourish, and experiences are cherished.</p>      
        </section>
        </div>

        <div className={styles.innerContainer}>
            <Faq/>
        </div>

        <div className={styles.innerContainer}>
            <Team/>
        </div>

        <Footer/>

      </div>
    </>
  );
};

export default About;
