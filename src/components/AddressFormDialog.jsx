import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../theme';

const AddressFromDialog = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog"
    >
        <DialogTitle id="confirm-dialog" variant='h3' fontWeight="bold" align="center">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
            <Button
                variant="contained"
                type="submit"
                onClick={() => {
                    setOpen(false);
                    onConfirm()
                }}
                sx={{
                    backgroundColor: colors.redAccent[500],
                    fontSize: "0.9rem",
                    width: '20%',
                    p: "10px",
                    "&:hover": {
                        backgroundColor: colors.primary[100],
                        color: colors.primary[900],
                    }
                }}
            >
                Save
            </Button>
         
        </DialogActions>
    </Dialog>
  )
}

export default AddressFromDialog