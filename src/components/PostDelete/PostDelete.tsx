import CreateButton from "../CreateButton/CreateButton";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion';
import { Button } from '@mui/material'
import { useParams } from "react-router-dom";
import classes from './PostDelete.module.css';

const PostDelete = () => {

    const params = useParams();

    return (
        <div className={classes.postDeleteContainer}>
            <h1>Event cancelled sucessfully!</h1>
            <h3>Thank you for keeping the events pages as accurate as possible!</h3>
            <div className={classes.postDeleteNavlinkContainer}>
                <NavLink to="/" >
                    <motion.div
                        whileHover={{ scale: 1.1 }}>
                        <Button
                            variant='contained'
                            size='small'
                        >Back to start</Button>
                    </motion.div>
                </NavLink>
            </div>
            <div className={classes.createContainer}>
                <h3>Create another {params.sport} event</h3>
                <CreateButton path={`${params.sport!}/create`} style="empty" />
            </div>
        </div>
    )
}

export default PostDelete;