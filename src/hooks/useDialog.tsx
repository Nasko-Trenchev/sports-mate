import { useState } from 'react';

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
