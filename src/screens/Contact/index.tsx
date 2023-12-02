import React from "react";
import styles from "./index.module.css";

// Components Here
import Header from "../../components/Header";

const ContactUs: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
      </div>
    </>
  );
};

export default ContactUs;
