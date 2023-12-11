import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
// import { Alert,  Card, CardContent, CircularProgress, InputAdornment, } from '@mui/material';
import { GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import logo from "../../assets/svg/logo.svg";
import { VIA } from "../../constants/app_constants";
import { auth } from "../../firebase";
import { setLogoutModal } from "../../store/reducer/user";
import { getMerchantInfo, registerUser } from "../../store/reducer/user/action";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { stringAvatar } from "../../utils/Image";
import { phoneValidator } from "../../utils/validation";
import SignInwithGoogle from "../SignInWithGoogle";
import Lottie from 'react-lottie';
import hello from '../../assets/lottie/loginn.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: hello,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  },
};

import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

auth.settings.appVerificationDisabledForTesting = true;

const recaptcha_site_key = "6LdZ7yUpAAAAAJYf_mCpCLwwJDug23F6zHrPn_R4";

const settings = ["Account", "Logout"];
const numberOfDigits = 6;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userInfo,
    isVerifying,
    loading,
    verificationError,
    imageLoading,
    verificationSuccess,
    logoutModal,
  } = useAppSelector((state) => state.user);
  const [resendTimer, setResendTimer] = useState(60);

  const [open, setOpen] = useState(false);
  const [phone, setPhoneNumber] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loginErrors, setLoginError] = useState(null);
  const otpInputRefs = useRef(
    Array.from({ length: 6 }, () => React.createRef())
  );
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [via, setVia] = useState<VIA>(VIA.GOOGLE);
  const [user, setUser] = useState(null);

  const dispatch = useAppDispatch();
  // const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value;

  //   // Ensure the input is a number and limit the length to 10 digits
  //   const sanitizedValue = inputValue.replace(/\D/g, "").slice(0, 6);

  //   // Update the state with the sanitized value
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);
  //   // setOtp(sanitizedValue);
  // };

  const handleResendOTP = () => {
    setResendTimer(60);
    // Clear existing OTP values
    setOtp(["", "", "", "", "", ""]);
    otpInputRefs.current[0].current.focus();
  };

  //Login modal

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (item) => {
    console.log(item);
    setAnchorElUser(null);
    if (item === "Account") {
      navigate("/account");
    } else if (item === "Logout") {
      dispatch(setLogoutModal(true));
    }
  };

  //resend OTP handler
  useEffect(() => {
    let interval;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  //Phone Input handler

  const handlePhoneInput = (e) => {
    const { value } = e.target;
    console.log("value", value);
    // Validate input to allow only numbers:
    const validChars = /^\d+$/; // Match only digits
    if (!validChars.test(value)) {
      return; // Reject non-numeric input
    }
    // Update the phone number state:
    setPhoneNumber(e.target.value);
    if (loginErrors?.phone) setLoginError(null);
  };

  console.log(userInfo)

  const handleBackPress = (e) => {
    if (e.key === "Backspace" && e.target.value.length == 1) {
      setPhoneNumber("");
    }
  };

  //OTP Input handler

  const handleChange = (value, index) => {
    if (loginErrors?.otp) setLoginError(null);
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpInputRefs.current[index + 1].current.focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputRefs.current[index - 1].current.focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpInputRefs.current[index + 1].current.focus();
    }
  };

  // Phone Signin Handlers
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        }
      );
    }
  }

  function onSignup() {
    if (phoneValidator(phone)) {
      setSending(true);
      onCaptchVerify();

      const appVerifier = window.recaptchaVerifier;

      const formatPh = "+91" + phone;
      console.log(formatPh);

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setConfirmation(confirmationResult);
          setSending(false);
          // setShowOTP(true);
          // toast.success("OTP sended successfully!");
        })
        .catch((error) => {
          console.log(error);
          setSending(false);
        });
    } else setLoginError({ phone: "Please Check your number." });
  }

  function onOTPVerify() {
    setVerifying(true);
    setVia(VIA.PHONE);
    window.confirmationResult
      .confirm(otp.join(""))
      .then(async (res) => {
        console.log(res);
        // setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
        setLoginError({ otp: "OTP not valid." });
      })
      .finally(() => {
        setVerifying(false);
      });
  }

  // Google Sign In handler
  const SignInWithGoogle = () => {
    if (via != VIA.GOOGLE) setVia(VIA.GOOGLE);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  //Login/Backend Handler
  const onAuthStateChanged = (user: any) => {
    // console.log('onAuthStateChanged called with user:', user);
    if (user) {
      console.log("Apple login user", user);
      const userInfo = localStorage.getItem("@user");

      // dispatch(setMerchantInfo(JSON.parse(userInfo)))
      if (userInfo) {
        const merchant = JSON.parse(userInfo);
        console.log(merchant?.username);
        if (merchant?.username) {
          dispatch(getMerchantInfo(merchant));
        } else dispatch(registerUser(user, via, "Auth"));
      } else dispatch(registerUser(user, via, "Auth"));
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts.
    };
  }, [via]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="befree logo" onClick={handleLogoClick} />
          BeFree
        </div>

        <div>
          {isMobile ? (
            <div>
              <button className={styles.login} onClick={handleClick}>
                Menu
              </button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloses}
              >
                <MenuItem
                  component={Link}
                  to="/"
                  selected={location.pathname === "/"}
                >
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/about"
                  selected={location.pathname === "/about"}
                >
                  About
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/contact"
                  selected={location.pathname === "/contact"}
                >
                  Contact Us
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className={styles.navigation}>
              <Link
                to="/"
                className={location.pathname === "/" ? styles.active : ""}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={location.pathname === "/about" ? styles.active : ""}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact" ? styles.active : ""
                }
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>

        {!userInfo ? (
          <button className={styles.login} onClick={handleOpen}>
            Login
          </button>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userInfo?.name && <Avatar {...stringAvatar(userInfo?.name)} />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
          <Lottie
            options={defaultOptions}/>
            <SignInwithGoogle signInWithGoogle={SignInWithGoogle} />
          </Box>
        </Modal>

      </div>
    </>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "8px",
  outline: "none",
  boxShadow: 24,
  p: 2,
};

export default Header;
