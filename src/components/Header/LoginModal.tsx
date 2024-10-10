import React from 'react'
import OrDivider from '../general/OrDivider'
import SignInwithGoogle from '../SignInWithGoogle'
import { Modal } from '@mui/material'

type Props = {}

// export default function LoginModal({}: Props) {
//   return (
//     <Modal open={open} onClose={handleClose}>
//           <Box sx={style}>
//             <Typography
//               variant="h5"
//               component="h2"
//               mb={2}
//               sx={{ color: colors.primary, fontWeight: 700 }}
//             >
//               Login
//             </Typography>

//             {confirmation && (
//               <h6 className={styles.sentNumber}>OTP sent to +91-{phone}</h6>
//             )}

//             <Box display="flex" flexDirection={"column"} alignItems={"center"}>
//               <TextField
//                 error={loginErrors?.phone ? true : false}
//                 label="Phone Number"
//                 variant="outlined"
//                 placeholder="Enter Your Phone Number"
//                 type="tel"
//                 fullWidth
//                 value={phone}
//                 onChange={handlePhoneInput}
//                 onKeyUp={handleBackPress}
//                 inputProps={{
//                   maxLength: 10,
//                   style: { fontSize: "1.5rem" },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       sx={{ marginRight: "1rem" }}
//                     >
//                       <img src={India} width={15} height={15} />
//                       <Typography
//                         variant="inherit"
//                         sx={{ marginLeft: ".5rem", fontSize: "1.2rem" }}
//                       >
//                         +91
//                       </Typography>
                     
//                     </Box>
//                   ),
//                 }}
//                 helperText={
//                   loginErrors?.phone ? "Please check your number." : null
//                 }
//               />

//               <div id="recaptcha-container"></div>

            
//               {!confirmation ? (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   disabled={sending}
//                   onClick={onSignup}
//                   sx={{ marginTop: "1.5rem" }}
//                 >
//                   {sending && (
//                     <CircularProgress size={15} sx={{ marginRight: ".5rem" }} />
//                   )}{" "}
//                   Send OTP
//                 </Button>
//               ) : (
//                 <div>
//                   <Box
//                     display="flex"
//                     alignItems={"center"}
//                     justifyContent={"space-between"}
//                   >
//                     {otp.map((digit, index) => (
//                       <TextField
//                         key={index}
//                         variant="outlined"
//                         type="text"
//                         value={digit}
//                         onChange={(e) => handleChange(e.target.value, index)}
//                         onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
//                         style={{
//                           width: "5rem",
//                           marginBottom: "3.5rem",
//                           margin: "2rem",
//                           fontSize: "1.5rem",
//                         }}
//                         inputRef={otpInputRefs.current[index]}
//                         inputProps={{
//                           maxLength: 1,
//                           style: { fontSize: "1.3rem", fontWeight: 400 },
//                         }}
//                       />
//                     ))}
//                   </Box>
//                   {loginErrors?.otp && (
//                     <Typography
//                       variant="inherit"
//                       sx={{
//                         color: colors.error,
//                         fontSize: "1.2rem",
//                         marginTop: "0.8rem",
//                         marginBottom: "0.8rem",
//                       }}
//                     >
//                       OTP is not correct
//                     </Typography>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={onOTPVerify}
//                     disabled={!otpValidator(otp.join("")) || verifying}
//                     sx={{ textAlign: "center", marginTop: "1rem" }} // Add marginTop for spacing
//                   >
//                     {verifying && (
//                       <CircularProgress
//                         size={15}
//                         sx={{ marginRight: ".5rem" }}
//                       />
//                     )}{" "}
//                     {verifying ? "Verifying .." : "Verify OTP"}
//                   </Button>

                  
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="space-between"
//                   >
//                     <div></div>
//                     <Typography variant="body2" color="textSecondary">
//                       {resendTimer > 0 ? (
//                         `Resend in ${resendTimer} seconds`
//                       ) : (
//                         <Button
//                           variant="outlined"
//                           color="primary"
//                           disabled={resendTimer > 0}
//                           onClick={handleResendOTP}
//                         >
//                           Resend OTP
//                         </Button>
//                       )}
//                     </Typography>
//                   </Box>
//                 </div>
//               )}
//             </Box>

//             {/* Divider */}
//             <OrDivider />

//             {/* Sign In with Google Button */}
//             <SignInwithGoogle signInWithGoogle={SignInWithGoogle} />
//           </Box>
//         </Modal> 
//   )
// }