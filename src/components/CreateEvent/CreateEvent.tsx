import classes from './CreateEvent.module.css';
import { motion } from 'framer-motion';
import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom';

const CreateEvent = () => {
    return (
        <div>
            <NavLink to={"create"} className={({ isActive, isPending }) =>
                isPending ? `${classes.pending}` : isActive ? `${classes.active}` : ""
            }>
                <motion.div
                    whileHover={{ scale: 1.1 }}>
                    <Button>Create event</Button>
                </motion.div>
            </NavLink>
        </div>
    )
}


export default CreateEvent;