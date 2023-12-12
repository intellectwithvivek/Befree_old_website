import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

// Components Here
import Faq from "../../components/About/Faq/Faq";
import Team from "../../components/About/Team/Team";
import Footer from "../../components/Footer";
import Welcome from "../../components/About/Welcome";

const About: React.FC = () => {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const elements = [
      welcomeRef.current,
      faqRef.current,
      teamRef.current,
      footerRef.current,
    ];

    elements.forEach((element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;

        if (isVisible) {
          element.classList.add(styles.animate); // Add your animation class
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.innerContainer} ref={welcomeRef}>
        <Welcome />
      </div>

      <div className={styles.innerContainer} ref={faqRef}>
        <Faq />
      </div>

      <div className={styles.innerContainer} ref={teamRef}>
        <Team />
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default About;
