import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';


function Modal({open, handleClose, loader, bookAnAppointment }) {

  const handleSubmit = () => {
    console.log('submit');
    bookAnAppointment();
  }

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >

        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Book an Appointment
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {
              loader ? <CircularProgress /> : 'submit'
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;