import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

const ConfirmDialog = (props) => {

    const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog"
    >
        <DialogTitle id="confirm-dialog">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
            <Button
                variant="contained"
                type="submit"
                onClick={() => {
                    setOpen(false);
                    onConfirm();
                }}
                color="primary"
            >
                Yes
            </Button>
            <Button
                variant="contained"
                onClick={() => setOpen(false)}
                color="secondary"
            >
                No
            </Button>
         
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog