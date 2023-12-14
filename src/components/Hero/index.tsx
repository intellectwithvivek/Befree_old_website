import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import hero from "../../assets/svg/hero.png";
import Lottie from "react-lottie";
import hotspot from "../../assets/lottie/hotspot.json";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { useNavigate } from "react-router-dom";
import { setLoginModal } from "../../store/reducer/app-data";
// Components Here

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: hotspot,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const textToType =
"Maaximize Profits, Increase Visibility, and Build Lasting Connections 🚀 - Your Venue, Your Offers, Your Success! 💼✨";


const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState("");
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
 

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < textToType.length) {
        setTypedText((prev) => prev + textToType.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Transform Your Venue into a Hotspot🔥 with BeFree.</h1>
          <p>{typedText}</p>
          <button onClick={onClick}>
               {buttonText()}
            <svg className={styles.link_icon}>
              <use xlinkHref="/sprite.svg#icon-chevron-right" />
            </svg>
          </button>
        </div>
        <div className={styles.right}>
          {/* <img src={hero} alt="hero" /> */}
          <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
        </div>
      </div>
    </>
  );
};

export default Hero;
