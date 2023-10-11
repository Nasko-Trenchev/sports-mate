import classes from './Event.module.css'
import { Stack, Divider } from "@mui/material";
import { useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';
import CreateEvent from '../CreateButton/CreateButton';
import Game from '../Game/Game'
import { Sports } from '../../util/sportTypes';

const Event: React.FC = () => {
    const params = useParams();
    const data = useRouteLoaderData('sport-details') as Sports

    if (data.length === 0) {
        return (
            <h1>There aren`t any events for this sport yet</h1>
        )
    }

    return (
        <>
            <h1>There {data.length > 1 ? "are" : "is"} {data.length} upcoming {params.sport} {data.length > 1 ? "events" : "event"}</h1>
            <div className={classes.createButton}>
                <CreateEvent />
            </div>
            <h2>Find your spot</h2>
            <p>Search bar</p>
            <h2>Currently opened groups</h2>

            <Stack
                direction={"column"}
                divider={<Divider orientation="horizontal" sx={{ color: "black" }} flexItem />}
                spacing={0}
                className={classes.gamesContainer}>
                {data.map((game, index) => (
                    <Game key={game.id} data={data[index]} />
                ))}
            </Stack>

        </>
    )
}

export default Event;