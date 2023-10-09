import classes from './Event.module.css'
import { Stack, Divider } from "@mui/material";
import Game from '../Game/Game'

const CoverImageList = [
    "https://t3.ftcdn.net/jpg/00/34/24/96/360_F_34249698_Oun7sm6fNLKUXpAtzgue06sTMyHSxwgB.jpg",
    "https://img.freepik.com/premium-photo/green-soccer-field-football-field-top-view-with-realistic-grass-texture-realistic-football-pitch_167120-261.jpg"
]
const FootBall: React.FC = () => {

    return (
        <>
            <h1>There are ... upcoming Football events</h1>
            <h2>Find your spot</h2>
            <p>Search bar</p>
            <h2>Currently opened groups</h2>

            <Stack
                direction={"column"}
                divider={<Divider orientation="horizontal" sx={{ color: "black" }} flexItem />}
                spacing={0}
                className={classes.gamesContainer}>
                <Game />
                <Game />
                <Game />
            </Stack>

        </>
    )
}

export default FootBall;