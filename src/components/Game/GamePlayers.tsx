import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const GamePlayers: React.FC<{ image: string, nickname: string }> = (props) => {
    return (
        <List sx={{ width: '30%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt={props.nickname} src={props.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.nickname}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Games played:
                            </Typography>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Mates rating:
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}

export default GamePlayers;