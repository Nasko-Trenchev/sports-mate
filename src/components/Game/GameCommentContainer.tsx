import classes from './GameCommentContainer.module.css';
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { useRouteLoaderData, Await } from "react-router-dom";
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import Comments from "../Comments/Comments";
import CommentTextarea from "../Comments/CommentTextArea";

const GameCommentContainer = () => {

    const { comments } = useRouteLoaderData('game-details') as loaderReturnArgs;

    return (
        <div className={classes.gameComments}>
            <Suspense fallback={<CircularProgress disableShrink sx={{ alignSelf: 'center' }} />}>
                <Await
                    resolve={comments}>
                    {(deferedComments) => (
                        deferedComments.length === 0 ? (
                            <div className={classes.noCommentsAvailable}>
                                <h4>There aren`t any comments about this event yet </h4>
                                <h4>Be the first to comment</h4>
                            </div>
                        ) :
                            <>
                                <h2>Comments {`(${deferedComments.length})`}</h2>
                                <Comments commentsData={deferedComments} />
                            </>

                    )}
                </Await>
            </Suspense>
            <CommentTextarea />
        </div>
    )
}

export default GameCommentContainer;