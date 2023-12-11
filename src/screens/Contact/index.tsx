import React from "react";
import styles from "./index.module.css";

import ContactUsForm from "../../components/contact/ContactUs";
import Footer from "../../components/Footer";

// Components Here
const ContactUs: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <ContactUsForm />
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
