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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FAQ;
