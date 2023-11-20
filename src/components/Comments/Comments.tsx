import { CommentsData } from '../../util/sportTypes';
import { StyledEngineProvider } from '@mui/material/styles';
import classes from './Comments.module.css';
import GamePlayers from '../Game/GamePlayers';

const Comments: React.FC<{ commentsData: CommentsData }> = (props) => {
    return (
        <StyledEngineProvider >
            <div className={classes.commentSection}>
                {props.commentsData.sort((a, b) => Number(a.date) - Number(b.date)).map((entry) => (
                    <div className={classes.commentContainer}>
                        <GamePlayers image={entry.image!} displayName={entry.user} key={entry.image} />
                        <div className={classes.commentData} key={entry.comment}>
                            <div className={classes.comment}>
                                <p>{entry.comment}</p>
                            </div>
                            <div className={classes.commentDate}>
                                <p>{entry.date.toDate().toDateString()}</p>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </StyledEngineProvider>
    )
}


export default Comments;

