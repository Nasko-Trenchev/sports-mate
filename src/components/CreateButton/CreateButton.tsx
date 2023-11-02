import classes from './CreateButton.module.css';
import { motion } from 'framer-motion';
import { Button } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom';

const CreateButton = () => {

    const param = useParams();
    return (
        <div>
            <NavLink to={`create`} className={({ isActive, isPending }) =>
                isPending ? `${classes.pending}` : isActive ? `${classes.active}` : ""
            }>
                <motion.div

                    whileHover={{ scale: 1.1 }}>
                    <Button
                        variant='contained'
                        size='small'
                    >Create event</Button>
                </motion.div>
            </NavLink>
        </div>
    )
}


export default CreateButton;