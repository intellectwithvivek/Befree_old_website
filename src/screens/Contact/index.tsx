import React from "react";
import styles from "./index.module.css";
import ContactUsForm from "../../components/contact/ContactUs";

// Components Here
const ContactUs: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <ContactUsForm/>
      </div>
    </>
  );
};

export default ContactUs;
