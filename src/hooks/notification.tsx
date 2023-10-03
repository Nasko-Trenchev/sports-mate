import { useState } from 'react';

type colorType = 'error' | 'info' | 'success' | 'warning' | undefined;

type actions = {
    message: string,
    color: colorType;
    open: boolean,
}

const useNotification = () => {

    const [actionOption, setActionOption] = useState<actions>({
        message: '',
        color: undefined,
        open: false
    });

    const handleClick = (message: string, color: colorType) => {
        setActionOption({ message: message, color: color, open: true })
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setActionOption({
            message: '',
            color: undefined,
            open: false
        })
    };

    return {
        closeNotification: handleClose,
        openNotification: handleClick,
        actionOption
    }
}

export default useNotification;
