import { CommentsData } from '../../util/sportTypes';
import { StyledEngineProvider } from '@mui/material/styles';
import { Pagination, Box } from "@mui/material";
import classes from './Comments.module.css';
import GamePlayers from '../Game/GamePlayers';
import { useState } from 'react';

const Comments: React.FC<{ commentsData: CommentsData }> = (props) => {
    const [page, setPage] = useState(1);

    const itemsPerPage = 4;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedItems = props.commentsData.slice(startIndex, endIndex);

    return (
        <StyledEngineProvider >
            <div className={classes.commentSection}>
                {displayedItems.map((entry, index) => (
                    //Index is not suitable for key if we have functionallity for editing comments on later stage
                    <div className={classes.commentContainer} key={index}>
                        <div className={classes.commentProfile}>
                            <GamePlayers date={entry.date.toDate().toDateString()} image={entry.image!} displayName={entry.user} key={index} />
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

