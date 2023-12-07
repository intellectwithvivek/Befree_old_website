import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
} from "@mui/material";
// import { Alert,  Card, CardContent, CircularProgress, InputAdornment, } from '@mui/material';
import India from "../../assets/svg/India.svg";
import logo from "../../assets/svg/logo.svg";
import SignInwithGoogle from "../SignInWithGoogle";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { setLogoutModal } from "../../store/reducer/user";
import { stringAvatar } from "../../utils/Image";
import OrDivider from "../general/OrDivider";
import { otpValidator, phoneValidator } from "../../utils/validation";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { load } from "recaptcha-v3";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getMerchantInfo, registerUser } from "../../store/reducer/user/action";
import { VIA } from "../../constants/app_constants";
import { colors } from "../../constants/colors";

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
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
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
          setShowOTP(true);
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="befree logo" onClick={handleLogoClick} />
          BeFree
        </div>

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
            className={location.pathname === "/contact" ? styles.active : ""}
          >
            Contact Us
          </Link>
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
            <Typography
              variant="h5"
              component="h2"
              mb={2}
              sx={{ color: colors.primary, fontWeight: 700 }}
            >
              Login
            </Typography>

            {confirmation && (
              <h6 className={styles.sentNumber}>OTP sent to +91-{phone}</h6>
            )}

            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <TextField
                error={loginErrors?.phone ? true : false}
                label="Phone Number"
                variant="outlined"
                placeholder="Enter Your Phone Number"
                type="tel"
                fullWidth
                value={phone}
                onChange={handlePhoneInput}
                onKeyUp={handleBackPress}
                inputProps={{
                  maxLength: 10,
                  style: { fontSize: "1.5rem" },
                }}
                InputProps={{
                  startAdornment: (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginRight: "1rem" }}
                    >
                      <img src={India} width={15} height={15} />
                      <Typography
                        variant="inherit"
                        sx={{ marginLeft: ".5rem", fontSize: "1.2rem" }}
                      >
                        +91
                      </Typography>
                      {/* Add your flag icon here */}
                    </Box>
                  ),
                }}
                helperText={
                  loginErrors?.phone ? "Please check your number." : null
                }
              />

              <div id="recaptcha-container"></div>

              {/* Button for Send OTP */}
              {!confirmation ? (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={sending}
                  onClick={onSignup}
                  sx={{ marginTop: "1.5rem" }}
                >
                  {sending && (
                    <CircularProgress size={15} sx={{ marginRight: ".5rem" }} />
                  )}{" "}
                  Send OTP
                </Button>
              ) : (
                <div>
                  <Box
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    {otp.map((digit, index) => (
                      <TextField
                        key={index}
                        variant="outlined"
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                        style={{
                          width: "5rem",
                          marginBottom: "3.5rem",
                          margin: "2rem",
                          fontSize: "1.5rem",
                        }}
                        inputRef={otpInputRefs.current[index]}
                        inputProps={{
                          maxLength: 1,
                          style: { fontSize: "1.3rem", fontWeight: 400 },
                        }}
                      />
                    ))}
                  </Box>
                  {loginErrors?.otp && (
                    <Typography
                      variant="inherit"
                      sx={{
                        color: colors.error,
                        fontSize: "1.2rem",
                        marginTop: "0.8rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      OTP is not correct
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onOTPVerify}
                    disabled={!otpValidator(otp.join("")) || verifying}
                    sx={{ textAlign: "center", marginTop: "1rem" }} // Add marginTop for spacing
                  >
                    {verifying && (
                      <CircularProgress
                        size={15}
                        sx={{ marginRight: ".5rem" }}
                      />
                    )}{" "}
                    {verifying ? "Verifying .." : "Verify OTP"}
                  </Button>

                  {/* Resend OTP and Timer */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div></div>
                    <Typography variant="body2" color="textSecondary">
                      {resendTimer > 0 ? (
                        `Resend in ${resendTimer} seconds`
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          disabled={resendTimer > 0}
                          onClick={handleResendOTP}
                        >
                          Resend OTP
                        </Button>
                      )}
                    </Typography>
                  </Box>
                </div>
              )}
            </Box>

            {/* Divider */}
            <OrDivider />

            {/* Sign In with Google Button */}
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
