import { CommentsData } from '../../util/sportTypes';
import { Stack } from '@mui/material';
import classes from './Comments.module.css';

const Comments: React.FC<{ commentsData: CommentsData }> = (props) => {
    return (
        <Stack>
            {props.commentsData.map((entry) => (
                <>
                    <Stack key={entry.comment} className={classes['comments']}>
                        <Stack className={classes['commentsUser']}>
                            <p>{entry.user}</p>
                            <p>{entry.date.toDate().toDateString()}</p>
                        </Stack>
                        <Stack className={classes['commentsUser']}>
                            <p>{entry.comment}</p>
                        </Stack>
                    </Stack>
                    <hr />
                </>
            )
            )}
        </Stack>
    )
}


export default Comments;

