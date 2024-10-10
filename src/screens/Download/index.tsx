import Forward from "@mui/icons-material/Forward";
import ArrowDownward from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import android from "../../assets/svg/android.svg";
import apple from "../../assets/svg/apple.svg";
import logo from "../../assets/svg/logo.svg";
import video from "../../assets/video/WebDwnBgsocial.mp4";
import Footer from "../../components/Footer";
import ReviewsShowcase from "../../components/Review/ReviewsShowcase";
import { activityReviews } from "../../constants/app_constants";
import { colors } from "../../constants/colors";
import styles from "./index.module.css";

type Props = {};

export default function Download({}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const openLinkInNewPage = (url) => {
    window.open(url, "_blank");
  };

  const handleInstaClick = () => {
    window.open(
      "https://www.instagram.com/smooth_aki?igsh=a2VkaHBsaW8xc285",
      "_blank"
    );
  };

  const handleLinkedClick = () => {
    window.open(
      "https://www.linkedin.com/in/akshay-tripathi-2b8620149/",
      "_blank"
    );
  };

  return (
    <>
      <div className={styles.main}>
        <video src={video} autoPlay loop muted />

        <div className={styles.content}>
          <div className={styles.mainText}>
            <h3 className={styles.titletexta}>
              Tired of Scrolling Alone or Swiping on Dating Apps? 😩 <br />
              Try <span style={{ color: colors.primary }}>" BeFree "</span> to
              build Genuine Connections! 🌟 BeFree’s AI helps you plan
              activities and explore events for real, meaningful connections.
            </h3>
          </div>
          <div className={styles.download}>
            <img
              src={apple}
              alt="apple"
              onClick={() =>
                openLinkInNewPage(
                  "https://apps.apple.com/in/app/befree/id6463606840"
                )
              }
              className={styles.enlargeOnHover}
            />
            <img
              src={android}
              alt="android"
              onClick={() =>
                openLinkInNewPage(
                  "https://play.google.com/store/apps/details?id=com.befree"
                )
              }
              className={styles.enlargeOnHover}
            />
          </div>
        </div>

        <section className={styles.appInfo}>
          <h2>What's unique ? </h2>
          <p>
            Unlike other social media platforms, BeFree connects people
            offline—in real life. Using AI, the app maps out like-minded people
            nearby, allowing them to easily join, host, and meet each other. You
            can either select a ‘mood’ and instantly see other people nearby who
            are up for the same thing, or plan ahead by creating a custom
            activity and inviting others directly.
          </p>
        </section>

        <section className={styles.reviewContainer}>
          <h2>Reviews</h2>
          <ReviewsShowcase reviews={activityReviews} />
        </section>

        <section className={styles.aboutContainer}>
          <h2>How Befree Works ? </h2>
          <div className={styles.about}>
            <div className={styles.aboutCard}>
              <h4>Plan Activities Using AI</h4>
            </div>
            {isMobile ? <ArrowDownward /> : <Forward />}
            <div className={styles.aboutCard}>
              <h4>Send or Accept Requests</h4>
            </div>
            {isMobile ? <ArrowDownward /> : <Forward />}
            <div className={styles.aboutCard}>
              <h4>Chat , Meet & Enjoy.</h4>
            </div>
          </div>
        </section>

        <div className={styles.video}>
          <iframe
            width={isMobile ? "300" : "560"}
            height="315"
            src="https://www.youtube.com/embed/DdCrv8gNNcI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        {/* <div>
                <ImageCarousel/>
                </div> */}

        <div className={styles.promotionPart}>
          <div className={styles.promotionPart1}>
            <h3>Download App Now</h3>
            <h4> ( 100% Free | 30+ Activities ) </h4>
            <div className={styles.promotiondownload}>
              <img
                src={apple}
                alt="apple"
                onClick={() =>
                  openLinkInNewPage(
                    "https://apps.apple.com/in/app/befree/id6463606840"
                  )
                }
                className={styles.enlargeOnHover}
              />
              <img
                src={android}
                alt="android"
                onClick={() =>
                  openLinkInNewPage(
                    "https://play.google.com/store/apps/details?id=com.befree"
                  )
                }
                className={styles.enlargeOnHover}
              />
            </div>
          </div>

          <div className={styles.video}>
            <iframe
              width={isMobile ? "250" : "315"}
              height="560"
              src="https://www.youtube.com/embed/Jc9Nnm_TIjM"
              title="Real Connections with BeFree - Live Real  #activity #adventure  #houseparty #concerts #meet #social"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        {/* <div className={styles.founderInfo}>
                    
                    <div style={{alignItems:'center',display:'flex',flexDirection:'column',marginBottom:10}}>
                    <Avatar {...stringAvatar("Akshay")}
                            src={require('../../assets/images/Akshay.jpg')}     
                            sx={{width:150,height:150}}/>
                            <h5>Akshay</h5>
                            <h5>[ Founder]</h5>
                            <span>
                                <IconButton onClick={handleInstaClick}>
                                <Instagram style={{color:'red' , width:30,height:30}}/>
                               </IconButton> 

                                <IconButton onClick={handleLinkedClick}>
                                <LinkedIn style={{color:colors.primary, 
                                            width:30,height:30,marginLeft:10}}/>
                                </IconButton>
                                
                            </span>
                    </div>

                     <Typography variant='h3' 
                     style={{fontSize:16,textAlign:'center',width:'70%',color:colors.black,fontWeight:'500'}}>
                     As the sole member behind this project, I've poured my passion, time, and dedication into creating something truly special.The journey so far has been an incredible learning experience, and I am excited to share that we are just getting started!. I have big plans to take <span style={{color:colors.primary}}>BeFree</span> to new heights, and I believe that, together, we can make it something extraordinary. 
                     <br/> <br/><span style={{color:colors.primary,fontWeight:'600',fontSize:14}}>"Spread the word, share your experiences, and let's grow BeFree into a community that thrives on innovation and creativity."</span>
                     </Typography>          

                </div> */}
      </div>
      <Footer />
    </>
  );
}
