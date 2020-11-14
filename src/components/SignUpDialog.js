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
export default function SignUpDialog(props) {
  const {currentUser} = props;
  const isInstructor = currentUser.instructor;
  const username = currentUser.username;
  const history = useHistory();
  
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    if (isInstructor){
      history.push('/instructorPage');
    }else{
      history.push('/clientPage')
    }
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open simple dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <DialogContentText>Hi, {username}!</DialogContentText>
          { !!isInstructor ? 
          <>
            <DialogContentText>As an instructor, you can get started creating classes on your dashboard.</DialogContentText> 
          </>:
          <>
            <DialogContentText>Start searching for the classes that work for you on your personal dashboard.</DialogContentText>
          </>
          
          }
          <DialogContentText>Thanks for joining Anywhere Fitness!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Let's Get Started
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}