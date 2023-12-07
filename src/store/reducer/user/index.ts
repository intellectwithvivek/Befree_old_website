import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Merchant } from "../../../@types/interfaces/merchant";

type initialStateI = {
  loading: boolean;
  userInfo?: Merchant | null;
  error?: Error | null;
  isInitializing: boolean;
  username?: string;
  verifying: boolean;
  profileError: Error | null;
  profileUpdating: boolean;
  loggingOut?: boolean;
  logoutError?: Error | null;
  isDeletedUser: boolean;
  isVerifying: boolean;
  verificationError?: Error | null;
  imageLoading?: boolean;
  verificationSuccess?: boolean;
  logoutModal: boolean;
};

const initialState = {
  loading: false,
  userInfo: null,
  isInitializing: false,
  loggingOut: false,
  isDeletedUser: false,
  isVerifying: false,
  logoutModal: false,
} as initialStateI;

const userSlice = createSlice({
  name: "userResource",
  initialState,
  reducers: {
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMerchantInfo(state, action: PayloadAction<Merchant>) {
      state.userInfo = action.payload;
    },
    setVerifying(state, action: PayloadAction<boolean>) {
      state.isVerifying = action.payload;
    },
    setUserError(state, action: PayloadAction<Error | null>) {
      state.error = action.payload;
    },
    setIsInitializing(state, action: PayloadAction<boolean>) {
      state.isInitializing = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setLoggingOut(state, action: PayloadAction<boolean>) {
      state.loggingOut = action.payload;
    },
    setIsDeletedUser(state, action: PayloadAction<boolean>) {
      state.isDeletedUser = action.payload;
    },
    setVerificationError(state, action: PayloadAction<Error | null>) {
      state.verificationError = action.payload;
    },
    setImageUploading(state, action: PayloadAction<boolean>) {
      state.imageLoading = action.payload;
    },
    setVerificationSuccess(state, action: PayloadAction<boolean>) {
      state.verificationSuccess = action.payload;
    },
    setLogoutModal(state, action: PayloadAction<boolean>) {
      state.logoutModal = action.payload;
    },
  },
});

export const {
  setMerchantInfo,
  setUserError,
  setIsInitializing,
  setUsername,
  setVerifying,
  setIsDeletedUser,
  setUserLoading,
  setVerificationError,
  setImageUploading,
  setVerificationSuccess,
  setLogoutModal,
} = userSlice.actions;

export default userSlice.reducer;
