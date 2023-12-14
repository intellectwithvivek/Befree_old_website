import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SnackTransitionState = {
  open: boolean;
  message?: string | null;
  severity?: string;
};

const initialState = {
  isAuth: false,
  isInitialized: false,
  isConnected: true,
  isVerified: false,
  loading: false,
  snackTransitionState: { open: false },
  popup: { open: false },
  loginModal:false
};
export type AllStatus = {
  isAuth: boolean;
  isInit: boolean;
  isVerified: boolean;
};

const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setIsInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
    setValidtyForBoth(state, action: PayloadAction<AllStatus>) {
      state.isAuth = action.payload.isAuth;
      state.isInitialized = action.payload.isInit;
      state.isVerified = action.payload.isVerified;
    },
    setVerified(state, action: PayloadAction<boolean>) {
      state.isVerified = action.payload;
    },
    setAppLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSnackBarVisible(state, action: PayloadAction<SnackTransitionState>) {
      state.snackTransitionState = action.payload;
    },
    setPopup(state, action: PayloadAction<SnackTransitionState>) {
      state.popup = action.payload;
    },
    setLoginModal(state,action:PayloadAction<boolean>){
      state.loginModal = action.payload
    }
  },
});

export const {
  setIsAuthenticated,
  setIsInitialized,
  setValidtyForBoth,
  setVerified,
  setAppLoading,
  setSnackBarVisible,
  setPopup,
  setLoginModal
} = appSlice.actions;
export default appSlice.reducer;
