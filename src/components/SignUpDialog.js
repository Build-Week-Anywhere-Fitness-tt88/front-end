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
      <Button size="large" variant="outlined" color="default" onClick={() => setOpen(true)}>
        Open simple dialog
      </Button>
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
            }}>Success!</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText><span style={textStyles}>Hi, {username}!</span></DialogContentText>
          { !!isInstructor ? 
          <>
            <DialogContentText><span style={textStyles}>As an instructor, you can get started creating classes on your dashboard.</span></DialogContentText> 
          </>:
          <>
            <DialogContentText><span style={textStyles}>Start searching for the classes that work for you on your personal dashboard.</span></DialogContentText>
          </>
          
          }
          <DialogContentText><span style={textStyles}>Thanks for joining Anywhere Fitness!</span></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            <span style={buttonTextStyles}>Start Now</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}