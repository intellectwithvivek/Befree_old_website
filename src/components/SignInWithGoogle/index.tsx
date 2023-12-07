import React, { useState, useEffect } from "react";
import GoogleIcon from "../../assets/svg/GoogleIcon.svg";
import styles from "./index.module.css";

type Props = {
  signInWithGoogle: () => void;
};

export default function SignInwithGoogle({ signInWithGoogle }: Props) {
  return (
    <div className={styles.container} onClick={signInWithGoogle}>
      <img src={GoogleIcon} />
      <span className={styles.googleText}>Continue with Google</span>
    </div>
  );
}
