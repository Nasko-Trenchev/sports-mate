import classes from './Event.module.css'
import { Stack, Divider, Button } from "@mui/material";
import { useLoaderData } from 'react-router-dom';
import CreateEvent from '../CreateEvent/CreateEvent';
import Game from '../Game/Game'
import { Sport } from '../../util/sportTypes';

const CoverImageList = [
    "https://t3.ftcdn.net/jpg/00/34/24/96/360_F_34249698_Oun7sm6fNLKUXpAtzgue06sTMyHSxwgB.jpg",
    "https://img.freepik.com/premium-photo/green-soccer-field-football-field-top-view-with-realistic-grass-texture-realistic-football-pitch_167120-261.jpg"
]
const Event: React.FC = () => {

    const data = useLoaderData() as Sport

    return (
        <>
            <h1>There are {data.length} upcoming Football events</h1>
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