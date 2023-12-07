import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../../constants/colors";
import React from "react";

type props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  okTitle: string;
};

const CommonDialog = ({ open, onClose, onConfirm, title, okTitle }: props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: colors.primary }}>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="info">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="warning">
          {okTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
