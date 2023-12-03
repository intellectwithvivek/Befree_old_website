import React, { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Menu, MenuItem, Tooltip
} from "@mui/material";
// import { Alert,  Card, CardContent, CircularProgress, InputAdornment, } from '@mui/material';

import logo from "../../assets/svg/logo.svg";
import SignInwithGoogle from "../SignInWithGoogle";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { setLogoutModal } from "../../store/reducer/user";
import { stringAvatar } from "../../utils/Image";

const settings = ['Account', 'Logout'];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, isVerifying, loading, verificationError, imageLoading , verificationSuccess , logoutModal} = useAppSelector(state => state.user)

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loginMethod, setLoginMethod] = useState("phone");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useAppDispatch()

  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Ensure the input is a number and limit the length to 10 digits
    const sanitizedValue = inputValue.replace(/\D/g, "").slice(0, 10);

    // Update the state with the sanitized value
    setMobileNumber(sanitizedValue);
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Ensure the input is a number and limit the length to 10 digits
    const sanitizedValue = inputValue.replace(/\D/g, "").slice(0, 6);

    // Update the state with the sanitized value
    setOtp(sanitizedValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    if (step === 0 && mobileNumber.length === 10) {
      // Add logic to send OTP to the provided mobile number
      // For demonstration purposes, let's assume OTP is sent successfully
      setOtpSent(true);
      setStep(step + 1);
    } else if (step === 1 && otp.length === 6) {
      // Add logic to verify OTP
      // For demonstration purposes, let's assume OTP verification is successful
      handleClose();
    }
  };

  const handleLoginMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginMethod(e.target.value as "phone" | "google");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (item) => {
    console.log(item)
    setAnchorElUser(null);
    if(item === 'Account')
       {
         navigate('/account');
        
        }
     else if(item === 'Logout'){
      dispatch(setLogoutModal(true));
     }     
  };

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

        {!userInfo ?<button className={styles.login} onClick={handleOpen}>
          Login
        </button>:
        <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userInfo?.name && <Avatar {...stringAvatar(userInfo?.name)} />}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>}

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h5" component="h2" mb={2}>
              Sign Up
            </Typography>
            <RadioGroup
              aria-label="login-method"
              name="login-method"
              value={loginMethod}
              onChange={handleLoginMethodChange}
            >
              <div className={styles.radio}>
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label="Login with Phone Number"
                />
                <FormControlLabel
                  value="google"
                  control={<Radio />}
                  label="Login with Google"
                />
              </div>
            </RadioGroup>

            {loginMethod === "phone" && (
              <>
                <Stepper activeStep={step} alternativeLabel>
                  <Step>
                    <StepLabel>Enter your mobile number</StepLabel>
                    <TextField
                      type="tel"
                      label="+91"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                      inputProps={{
                        inputMode: "numeric",
                      }}
                    />
                  </Step>
                  <Step>
                    <StepLabel>Submit OTP</StepLabel>
                    <TextField
                      type="tel"
                      label="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      inputProps={{
                        inputMode: "numeric",
                      }}
                      disabled={!otpSent}
                    />
                  </Step>
                </Stepper>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={
                      (step === 0 && mobileNumber.length !== 10) ||
                      (step === 1 && !otpSent)
                    }
                  >
                    {step === 0 ? "Submit Mobile Number" : "Verify OTP"}
                  </Button>
                </Box>
              </>
            )}

            {loginMethod === "google" && (
              <SignInwithGoogle/>
            )}
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
