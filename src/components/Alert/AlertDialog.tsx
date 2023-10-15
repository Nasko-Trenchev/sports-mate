import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


type alertActions = {
    title: string,
    confirmationText: string,
    open: boolean,
    confirm: (e: React.MouseEvent<HTMLButtonElement>) => void,
    cancel: () => void
}

const AlertDialog: React.FC<alertActions> = (props) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Dialog fullScreen={fullScreen}
            open={props.open}
            onClose={props.cancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {/* {"Use Google's location service?"} */}
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.confirmationText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.confirm}>Confirm</Button>
                <Button onClick={props.cancel} autoFocus>
                    Decline
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;