import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
  open,
  handleClose,
  handleSubmit,

  dialogTitle,
  dialogContentText,
  buttonText,
  children,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText} </DialogContentText>
          {children}
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
