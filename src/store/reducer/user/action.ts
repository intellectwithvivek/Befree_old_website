import { Dispatch } from 'redux';
import { setIsDeletedUser, setMerchantInfo, setUserError, setUserLoading, setUsername, setVerificationError, setVerificationSuccess, setVerifying } from ".";
import { Merchant } from "../../../@types/interfaces/merchant";
import userDetailsService from "../../../services/apis/userDetailsService";
import verificationService from "../../../services/apis/verificationService";
import { createRegisteringUser, createRegisteringUserViaAuthStateChange } from "../../../utils/register";
import { savetokenStorage } from "../../../utils/storage";
import { validateMerchantInfo } from "../../../utils/validation";
import { setAppLoading, setIsAuthenticated, setIsInitialized, setPopup, setValidtyForBoth, setVerified } from "../app-data";

export const registerUser = (userCredentials: any, via: string, with_auth?: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppLoading(true))
    const user = with_auth ? createRegisteringUserViaAuthStateChange(userCredentials, via) : createRegisteringUser(userCredentials, via);
    console.log("user", user)
    if (user) {
      //returns Only token
      const { data } = await userDetailsService.registerUser(user);
      console.log(data)
      if (data  && user.username) {
        dispatch(setMerchantInfo(data.user))
        dispatch(setUsername(data?.user?.username ?? user?.username))
        savetokenStorage(data.token)
        localStorage.setItem("@user", JSON.stringify(data.user))

        if (data.user.deleted) {
          dispatch(setIsDeletedUser(true))
        }
        else if (validateMerchantInfo(data.user)) {
          //user is already initialized
          dispatch(setValidtyForBoth({ isAuth: true, isInit: true }));
        }
        else dispatch(setIsAuthenticated(true))
      }
      //save access token
      //dispatch userData to store
      //set isAuth to true    
    }
  } catch (error: any) {
    dispatch(setUserError(error)); // dispatch an action to inform the component that an error occurred while fetching the location data
  } finally {
    dispatch(setUserLoading(false));
    dispatch(setAppLoading(false))
  }
};


export const getMerchantInfo = (userData: Merchant) => async (dispatch: Dispatch) => {
  try {
    if (userData.username) {
      dispatch(setAppLoading(true))
      const { data } = await userDetailsService.getMerchantInfo(userData?.username);
      if (data && data.username) {
        dispatch(setMerchantInfo(data));
        dispatch(setUsername(data.username))
      }
      if (validateMerchantInfo(data))
        dispatch(setValidtyForBoth({ isAuth: true, isInit: true ,isVerified:data.verified }));
      else dispatch(setValidtyForBoth({ isAuth: true, isInit: false ,isVerified:data.verified}));

    }
  } catch (error) {
    console.log(error)
  }
  finally{
    dispatch(setAppLoading(false))
  }
}

export const initializeMerchantInfo = (userData: Merchant) => async (dispatch: Dispatch) => {
  try {
    if (userData.username) {
      dispatch(setAppLoading(true));
      
      //save data to firestore & save data to backend
      const response = await userDetailsService.initializeMerchant(userData)
      //after set Init to true and get the mesasging token from Firebase
        
      if (response.status == 200) {
        dispatch(setMerchantInfo(response.data));
        dispatch(setIsInitialized(true))
        dispatch(setPopup({open:true,severity:"success",
                  message:"Initilization Successfull! Start Adding Offers."}))
      }
    }
    else alert("Data invalid")
  } catch (error: any) {
    }
  finally {
    dispatch(setAppLoading(false));
  }
}

export const verifytheUser = (merchantInfo:Merchant) => async (dispatch:Dispatch) => {
    try {
        
        const response = await userDetailsService.verifyMerchantInfo(merchantInfo)
        console.log("verifytheUser",response.data)
        if (response.status == 200 && response.data) {
          console.log("info verified", response.data)
          dispatch(setMerchantInfo(response.data));
          dispatch(setVerified(true)) 
        }
    } catch (error) {
      
    }
    finally{
      dispatch(setVerificationSuccess(false))
     
    }
}


export const OTPverification = (verification: any, place_image:string , username:string) => async (dispatch: Dispatch) => {
  try {
    if (verification) {
      dispatch(setVerifying(true))
      const response = await verificationService.verifyOTP(verification)
      if (response.data.status === 200) {
        console.log("Merchant Verified")
        dispatch(setVerificationSuccess(true))
        verifytheUser({place_image,username,phone:verification?.phone})
      }
      else if (response.data.status === 409) {
        console.log("Invalid OTP/ Wrong OTP !Try again")
        dispatch(setVerificationError({message:"Invalid OTP",name:'Verify_ERROR'}))
      }
      else if (response.data.status === 204) {
        console.log("Mismatch Wrong OTP !Try again")
        dispatch(setVerificationError({message:"Something Went Wrong!",name:'Verify_ERROR_Resend'}))
      }
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    dispatch(setVerifying(false))
  }
}


export const broadcastOffer = (merchantInfo:Merchant) => async (dispatch:Dispatch) => {
  try {
      await userDetailsService.broadcast(merchantInfo);
  } catch (error) {
    
  }
  finally{
   
  }
} 