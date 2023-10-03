import { forwardRef } from 'react';
import { AlertProps, Alert } from '@mui/material';


export const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={6} ref={ref} {...props} />
    }
)