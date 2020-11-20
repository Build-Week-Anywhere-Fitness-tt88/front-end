import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function NoAccountDialog() {
  const history = useHistory();

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    history.push('/signup'); 
  };

  const textStyles = {
    fontSize: "2.4rem",
    color: '#ffffff',
  }
  const buttonTextStyles = {
    border: '1px solid #242943',
    padding: '8px 16px',
    fontSize: "1.6rem",
    color: '#ffffff',
  }
  
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh",
            minWidth: "50vw",
            backgroundColor: "#887fbb",
            justifyContent: "center",
            alignItems: "center"
          }
         }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <span 
            style={{
              fontSize: '4rem',
              fontWeight: '600',
              color: '#ffffff',
              margin: "0 auto"
            }}>Have we met?</span>
        </DialogTitle>
        <DialogContent>
            <DialogContentText><span style={textStyles}>It looks like you haven't signed up for an account.</span></DialogContentText> 
            <DialogContentText><span style={textStyles}>Please sign up on our Sign Up page.</span></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            <span style={buttonTextStyles}>Sign Up</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}