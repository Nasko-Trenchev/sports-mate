import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import { IconButton } from "@mui/material";

import classes from './SportItem.module.css'

const SportItem: React.FC<{ children: JSX.Element[] | JSX.Element, sport: string, path: string }> = (props) => {

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 500 }}
        >
            <NavLink to={props.path} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${classes.active}` : ""
            }>
                <IconButton size="large" edge='start' sx={{ color: 'black' }}>
                    {props.children}
                    <div>{props.sport}</div>
                </IconButton>
            </NavLink>
        </motion.div>
    )
}

export default SportItem;