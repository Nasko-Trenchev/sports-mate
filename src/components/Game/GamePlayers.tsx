import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const GamePlayers: React.FC<{ image: string, nickname: string }> = (props) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt={props.nickname} src={props.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.nickname}
                />
            </ListItem>
        </List>
    );
}

export default GamePlayers;