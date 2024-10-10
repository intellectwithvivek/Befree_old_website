import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

// Components Here
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import Partner from "../../components/Partner";
import Works from "../../components/Works";
import FAQ from "../../components/FAQ";
import Final from "../../components/Final";
import Download from "../Download";

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const partnerRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const elements = [
      heroRef.current,
      partnerRef.current,
      worksRef.current,
      faqRef.current,
      finalRef.current,
      footerRef.current,
    ];

    elements.forEach((element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;

        if (isVisible) {
          element.classList.add(styles.animate);
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
      {/* <div className={styles.container}>
        <div ref={heroRef}>
          <Hero />
        </div>

        <div ref={partnerRef}>
          <Partner />
        </div>

        <div ref={worksRef}>
          <Works />
        </div>

        <div ref={faqRef}>
          <FAQ />
        </div>

        <div ref={finalRef}>
          <Final />
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </div> */}
      <Download/>
    </>
  );
};

export default Home;
