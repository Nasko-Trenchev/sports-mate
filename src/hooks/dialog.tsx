import { useState } from 'react';

type colorType = 'error' | 'info' | 'success' | 'warning' | undefined;

type actions = {
    message: string,
    color: colorType;
    open: boolean,
}

const useDialog = () => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return {
        closeDialog: handleClose,
        openDialog: handleOpen,
        open
    }
}

export default useDialog;
