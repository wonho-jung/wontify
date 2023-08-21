import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import breakpoints from "./breakpoints";
import styled from "styled-components";

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

export const useBreakpoints = () => {
  const toMediaQuery = (px: string) => `(min-width: ${px})`;
  const sm = useMediaQuery(toMediaQuery(breakpoints.sm), { noSsr: true });
  const md = useMediaQuery(toMediaQuery(breakpoints.md), { noSsr: true });
  const lg = useMediaQuery(toMediaQuery(breakpoints.lg), { noSsr: true });
  const xl = useMediaQuery(toMediaQuery(breakpoints.xl), { noSsr: true });
  // Cant have variable named 2xl so using xxl instead
  const xxl = useMediaQuery(toMediaQuery(breakpoints["2xl"]), { noSsr: true });
  return {
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};

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
            }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const HomeContainer = styled.main`
  padding-top: 80px;
  padding-left: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background-color: #121212;
`;
const SearchContainer = styled.main`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  margin-bottom: 75px;
  overflow: auto;
  background-color: #121212;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const BodyContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background: linear-gradient(rgb(91, 87, 115), rgba(0, 0, 0, 1));
  ::-webkit-scrollbar {
    display: none;
  }
`;
const DetailPlaylistContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background: linear-gradient(#42275a, #734b6d);
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SearchResultContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  padding-bottom: 75px;
  overflow: auto;
  background-color: #121212;
  ::-webkit-scrollbar {
    display: none;
  }
`;
