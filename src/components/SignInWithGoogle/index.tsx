import React , {useState ,useEffect} from 'react'
import GoogleIcon from '../../assets/svg/GoogleIcon.svg'
import styles from "./index.module.css";
import { useAppDispatch } from '../../store/store/store';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
import { getMerchantInfo, registerUser } from '../../store/reducer/user/action';
import { VIA } from '../../constants/app_constants';

type Props = {}

export default function SignInwithGoogle({}: Props) {

  const dispatch = useAppDispatch();


  const SignInWithGoogle = () => {
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
      }).catch((error) => {
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



  const onAuthStateChanged = (user: any) => {
    // console.log('onAuthStateChanged called with user:', user);
    if (user) {
      console.log("Apple login user", user)
      const userInfo = localStorage.getItem("@user")

      // dispatch(setMerchantInfo(JSON.parse(userInfo)))
      if (userInfo) {
        const merchant = JSON.parse(userInfo)
        console.log(merchant?.username)
        if (merchant?.username) {
          dispatch(getMerchantInfo(merchant))
        }
        else dispatch(registerUser(user, VIA.GOOGLE, "Auth"));
      }
      else dispatch(registerUser(user, VIA.GOOGLE, "Auth"));
    }
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts.
    };
  }, []);

  return (
    <div className={styles.container} onClick={SignInWithGoogle}>
        <img src={GoogleIcon}/>
        <span className={styles.googleText}>Continue with Google</span>
    </div>
  )
}