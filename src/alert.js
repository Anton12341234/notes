import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function AlertDialog({open, handleClose}) {

    return (
      <div>
        <Dialog
          open={open}
          onClose={()=>handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete the note?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            It will be impossible to restore
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleClose(false)}>Сancell</Button>
            <Button onClick={()=>handleClose(true)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }