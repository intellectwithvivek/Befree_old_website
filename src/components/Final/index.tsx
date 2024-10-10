import React from "react";
import styles from "./index.module.css";

import apple from "../../assets/svg/apple.svg";
import android from "../../assets/svg/android.svg";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { useNavigate } from "react-router-dom";
import { setLoginModal } from "../../store/reducer/app-data";

// Components Here

const Final: React.FC = () => {

  const {isAuth,isInitialized} = useAppSelector(state=>state.appData)
  const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onClick=(e)=>{
      e.preventDefault();
      
      if(!isAuth)
        {
          dispatch(setLoginModal(true));
        }
      else if(!isInitialized)
        {
          navigate("/account")
        }
        else {
          navigate("/offers")
        }  
    }

    const buttonText=()=>{
      if(!isAuth)
        {
            return "Join Now"
        }
      else if(!isInitialized)
        {
          return "Initialized Account"
        }
        else {
          return "Add Offers"
        }
    }

  const openLinkInNewPage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Become a Befree partner today</h2>
        <p>
        Join us on this exciting journey of connection and experience creation. Showcase your <span>venue</span> for <span>events</span> and attract a dynamic crowd. Users, plan next memorable event and invite others to join you. <br/><br/>Together, let's build a community where every event is an opportunity to connect and create lasting memories.
        </p>
        <button onClick={onClick}>
          {buttonText()}
          <svg className={styles.link_icon}>
            <use xlinkHref="/sprite.svg#icon-chevron-right" />
          </svg>
        </button>
        <h3>Download Befree app</h3>
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
    </>
  );
};

export default Final;
