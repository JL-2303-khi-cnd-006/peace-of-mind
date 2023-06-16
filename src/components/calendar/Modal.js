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

        <DialogTitle id="draggable-dialog-title" style={{ backgroundColor: '#147c74', color: '#ffffff' }} >
          Book an Appointment
       
        <DialogActions sx={
          {
            marginTop: '1rem',
            '& .btn':{
              color: '#ffffff',
              ':hover':{
                background : 'rgb(3 44 41)'
              }

            },
          }
        } >
          <Button onClick={handleClose} className='btn'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='btn'>
            {
              loader ? <CircularProgress /> : 'Book'
            }
          </Button>
        </DialogActions>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Modal;