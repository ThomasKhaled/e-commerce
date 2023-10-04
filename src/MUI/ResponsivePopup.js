import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import defaultData from "../utils/defaultData";

export default function ResponsivePopup({ openD, onCloseD }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
    onCloseD(false);
  };

  useEffect(() => {
    setOpen(openD);
  }, [openD]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"MegaMart's Terms and conditions"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {defaultData.termsAndConditions}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
