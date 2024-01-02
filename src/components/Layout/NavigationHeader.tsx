import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from "../../config/firebase";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import classes from './NavigationHeader.module.css';
import ProfileIcon from "../Profile/ProfileIcon";

export default function NavigationHeader() {

    const navigate = useNavigate();

    return (
        <StyledEngineProvider injectFirst>
            <AppBar position="static" className={classes["navBar"]}>
                <Toolbar>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" onClick={() => { navigate('/') }}>
                        <SportsSoccerSharpIcon />
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{ flexGrow: 1, fontFamily: 'Inter sans-serif', fontSize: '24px', fontStyle: 'italic' }}>
                        <NavLink to={'/'} className={classes['links']}>SportsMate</NavLink>
                    </Typography>

                    <Stack direction={'row'}>
                        {auth.currentUser ?
                            <>
                                <Button color="inherit"><NavLink to={'/'} className={classes['links']}>Home</NavLink></Button>
                                <Button color="inherit"><NavLink to={'/logout'} className={classes['links']}>Logout</NavLink></Button>
                                <ProfileIcon />
                            </>
                            :
                            <>
                                <Button color="inherit"><NavLink to={'/register'} className={classes['links']}>Register</NavLink></Button>
                                <Button color="inherit"><NavLink to={'/login'} className={classes['links']}>Login</NavLink></Button>
                            </>
                        }
                    </Stack>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton size="large" edge='start' color="inherit" aria-label="logo" sx={{ margin: '1px' }}>
                        <InstagramIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </StyledEngineProvider>
    )
}
