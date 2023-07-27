import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IFormDialog {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  dialogTitle: string;
  dialogContentText: string;
  buttonText: string;
  children?: React.ReactNode;
  buttonDisabled?: boolean;
}

export default function FormDialog({
  open,
  handleClose,
  handleSubmit,

  dialogTitle,
  dialogContentText,
  buttonText,
  children,

  buttonDisabled = false,
}: IFormDialog) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText} </DialogContentText>
          {children && children}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#1db954",
              "&:hover": {
                backgroundColor: "#1db954",
                color: "#ffffff",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            disabled={buttonDisabled}
            sx={{
              color: "#1db954",
              "&:hover": {
                backgroundColor: "#1db954",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
