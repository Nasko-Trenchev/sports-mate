import { CommentsData } from '../../util/sportTypes';
import { StyledEngineProvider } from '@mui/material/styles';
import { Stack, Divider, Pagination, Box } from "@mui/material";
import { useRouteLoaderData } from 'react-router-dom';
import classes from './Comments.module.css';
import GamePlayers from '../Game/GamePlayers';
import { useState } from 'react';
import { loaderReturnArgs } from '../../pages/GameDetailsPage';

const Comments: React.FC<{ commentsData: CommentsData }> = (props) => {
    const [page, setPage] = useState(1);
    console.log(page)

    const itemsPerPage = 4;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedItems = props.commentsData.slice(startIndex, endIndex);


    return (
        <StyledEngineProvider >
            <div className={classes.commentSection}>
                {displayedItems.map((entry, index) => (
                    <div className={classes.commentContainer} key={index}>
                        <div className={classes.commentProfile}>
                            <GamePlayers date={entry.date.toDate().toDateString()} image={entry.image!} displayName={entry.user} key={entry.image} bgColor='white' />
                        </div>
                        <div className={classes.commentData}>
                            <div className={classes.comment}>
                                <p>{entry.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={Math.ceil(props.commentsData.length / itemsPerPage)}
                    page={page}
                    onChange={(event, page) => setPage(page)}
                />
            </Box>
        </StyledEngineProvider>
    )
}


export default Comments;

