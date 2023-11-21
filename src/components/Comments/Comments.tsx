import { CommentsData } from '../../util/sportTypes';
import { StyledEngineProvider } from '@mui/material/styles';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './Comments.module.css';
import GamePlayers from '../Game/GamePlayers';
import { loaderReturnArgs } from '../../pages/GameDetailsPage';

const Comments: React.FC<{ commentsData: CommentsData }> = (props) => {

    const { comments } = useRouteLoaderData('game-details') as loaderReturnArgs;

    return (
        <StyledEngineProvider >
            <div className={classes.commentSection}>
                {props.commentsData.map((entry) => (
                    <div className={classes.commentContainer}>
                        <GamePlayers image={entry.image!} displayName={entry.user} key={entry.image} bgColor='blue'/>
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

