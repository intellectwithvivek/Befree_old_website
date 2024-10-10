import React from "react";
import Footer from "../../components/Footer";
import styles from "./Privacy.module.css";

const PrivacyPolicyScreen = () => {
  return (
    <>
    <div className={styles.privacyContainer}>
    
      <h1 className={styles.title}>Privacy Policy</h1>
    
      <p><em>Effective Date: 2023-06-01</em></p>
    
      <p>We built the Befree app as a free service, provided by us at no cost, and it is intended for use as is.</p>
    
      <p>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal
        Information if anyone decides to use our service.</p>
    
      <p>If you choose to use our service, you agree to the collection and use of information in relation to this policy. The
        Personal Information that we collect is used for providing and improving the service. We will not use or share your
        information with anyone except as described in this Privacy Policy.</p>
    
      <h2>Information Collection and Use</h2>
    
      <p>For a better experience, while using our service, we may require you to provide certain personally identifiable
        information, including but not limited to your location, name, pictures, and date of birth. This information is used
        to personalize and enhance your experience with our service. We do not share this information with any third parties.
      </p>
    
      <h2>Data Storage and Security</h2>
    
      <p>We value your trust in providing us with your Personal Information. We strive to use commercially acceptable means
        to protect it. However, please be aware that no method of transmission over the internet or method of electronic
        storage is 100% secure and reliable, and we cannot guarantee absolute security.</p>
    
      <h2>Log Data</h2>
    
      <p>We want to inform you that whenever you use our service, in the event of an error, we collect data and information
        (through third-party products) on your device called Log Data. This Log Data may include information such as your
        device's Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when
        utilizing our service, the time and date of your use of the service, and other statistics. This data is used for
        troubleshooting, analyzing app performance, and improving the service.</p>
    
      <h2>Third-Party Service Providers</h2>
    
      <p>Our app may use third-party companies and individuals to facilitate and enhance our service, perform
        service-related services, or assist us in analyzing how the service is used. These third-party service providers may
        have access to your Personal Information but are obligated not to disclose or use it for any other purpose.</p>
    
      <h2>Links to Other Sites</h2>
    
      <p>Our service may contain links to other websites. Please note that we have no control over the content, privacy
        policies, or practices of any third-party sites or services. We encourage you to review the privacy policies of
        those websites before providing any personal information.</p>
		
		 <p>
          Link to the privacy policy of third-party service providers used by
          the app
        </p>
        <ul>
          <li>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              className={styles.links}
            >
              Google Play Services
            </a>
          </li>
          <li>
            <a
              href="https://razorpay.com/privacy/"
              target="_blank"
              className={styles.links}
            >
              RazorPay Privacy
            </a>
          </li>
          <li>
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              className={styles.links}
            >
              Privacy and Security in Firebase 
            </a>
          </li>
        </ul>
    
      <h2>Children's Privacy</h2>
    
      <p>Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
        information from children under 13 years of age. If we discover that a child under 13 has provided us with personal
        information, we will immediately delete it from our servers. If you are a parent or guardian and you are aware that
        your child has provided us with personal information, please contact us</p>
        <h2>Changes to This Privacy Policy</h2>
  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
    Policy on this page. It is advised to review this Privacy Policy periodically for any changes.</p>
  <h2>Contact Us</h2>
  <p>If you have any questions or suggestions about our Privacy Policy, please don't hesitate to contact us at
    <span style={{color:"pink",marginLeft:10}}>betabefree340@gmail.com</span></p>
</div>
<Footer/>
</>  );
};

export default PrivacyPolicyScreen;
