import React from "react";
import styles from "./index.module.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Components Here

const FAQ: React.FC = () => {
  const interFontStyle = {
    fontFamily: "Inter",
    fontSize: "1.5rem",
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.content}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={interFontStyle}>What is Befree ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={interFontStyle}>
                At Befree, you have the option to organize your activities by
                choosing from a variety of categories we provide. Additionally,
                you can connect with other individuals who have similar
                interests, making it a great platform for networking and meeting
                new people.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography style={interFontStyle}>
                Is Befree a Dating App?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={interFontStyle}>
                No, Befree is not a dating app. It is a platform that focuses on
                helping users plan their activities based on various categories
                and connect with others who share similar interests. It promotes
                social interactions and networking but does not specifically
                target dating.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography style={interFontStyle}>Do we need to pay?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={interFontStyle}>
                Befree can be downloaded at no cost, and as of now, there are no
                charges applied to access any of its features.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography style={interFontStyle}>
                Can Befree be useful to someone
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={interFontStyle}>
                Undoubtedly, Befree can be extremely useful in expanding your
                social networks and connecting with like-minded individuals. It
                provides an opportunity to explore society beyond the confines
                of social media platforms.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FAQ;
