import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { colors } from '../../constants/colors';
import { Typography } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm ,offer}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{color:colors.primary}}>Are you sure you want to delete the {offer?.title} offer?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="info">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="warning" >
         Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
