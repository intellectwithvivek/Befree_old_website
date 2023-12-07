import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { setSnackBarVisible } from "../../store/reducer/app-data";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

export default function TransitionsSnackbar() {
  const dispatch = useAppDispatch();
  const { snackTransitionState } = useAppSelector((state) => state.appData);

  const handleClick = (Transition) => () => {
    dispatch(
      setSnackBarVisible({
        open: true,
        message: "",
      })
    );
  };

  const handleClose = () => {
    dispatch(setSnackBarVisible({ open: false }));
  };

  return (
    <div>
      <Snackbar
        open={snackTransitionState?.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={snackTransitionState?.message}
        key={SlideTransition.name}
        autoHideDuration={6000}
      />
    </div>
  );
}
