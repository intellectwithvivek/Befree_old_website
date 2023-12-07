import shorthash from "shorthash";
import { VIA } from "../constants/app_constants";
import {
  GoogleUser,
  Merchant,
  userCredentials,
} from "../@types/interfaces/merchant";

export const createRegisteringUser = (
  additionalUserInfo: userCredentials,
  via: string
): Merchant => {
  const uid = additionalUserInfo.user?.uid;
  const username = shorthash.unique(uid);
  let user = {};
  if (via == VIA.PHONE) {
    const phone_number = additionalUserInfo.user?.phoneNumber;
    const password = shorthash.unique(phone_number);

    user = {
      username: username,
      uid: uid,
      phone: phone_number,
      password: password,
      signvia: via,
      isVerified: false,
    };
  } else if (via === VIA.GOOGLE || via === VIA.APPLE) {
    const email = additionalUserInfo.user?.email;
    const password = shorthash.unique(email);
    user = {
      username: username,
      uid: uid,
      email: email,
      password: password,
      signvia: via,
      isVerified: false,
    };
  }
  return user;
};

export const createRegisteringUserViaAuthStateChange = (
  user: GoogleUser,
  via: string
): Merchant => {
  const uid = user?.uid;
  const username = shorthash.unique(uid);
  let app_user = {};
  if (via == VIA.PHONE) {
    const phone_number = user?.phoneNumber;
    const password = shorthash.unique(phone_number);

    app_user = {
      username: username,
      uid: uid,
      phone: phone_number,
      password: password,
      signvia: via,
      isVerified: false,
    };
  } else if (via === VIA.GOOGLE || via === VIA.APPLE) {
    const email = user?.email;
    const password = shorthash.unique(email);
    app_user = {
      username: username,
      uid: uid,
      email: email,
      password: password,
      signvia: via,
      isVerified: false,
      name: user?.displayName,
      image: user?.photoURL,
      phone: user?.phoneNumber,
    };
  }
  return app_user;
};
