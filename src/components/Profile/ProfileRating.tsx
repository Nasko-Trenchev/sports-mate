import classes from './ProfileRating.module.css'
import { Rating } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';

export type ratingArray = {
    sport: string,
    rating: number,
    votes: number | undefined
}[]

const ProfileRating: React.FC<{ userRating: ratingArray }> = (props) => {

    const getIcon = (sport: string) => {
        let markup;
        switch (sport) {
            case 'Football': markup = <SportsSoccerSharpIcon />
                break;
            case 'Volleyball': markup = <SportsVolleyballIcon />
                break;
            case 'Tennis': markup = <SportsTennisIcon />
                break;
            case 'Basketball': markup = <SportsBasketballIcon />
                break;
        }
        return markup;
    }

    const getPalyerLevel = (votes: number | undefined, rating: number) => {
        if (votes === undefined || votes < 5) {
            return `Not enought votes yet. A minimum of 5 votes are required to confirm that skill. 
            Received ${votes !== undefined ? votes : "none"} so far.`
        }
        let tooltipTitle;
        switch (rating) {
            case 5: tooltipTitle = "Professional";
                break;
            case 4: tooltipTitle = "Expert";
                break;
            case 3: tooltipTitle = "Advanced";
                break;
            case 2: tooltipTitle = "Beginner";
                break;
            case 1: tooltipTitle = "Novice";
                break;
        }

        return `${tooltipTitle} (${votes} votes).`
    }

    return (
        <>
            {props.userRating.map(entry => (
                <Tooltip title={getPalyerLevel(entry.votes, entry.rating)} placement="right-start">
                    <div className={classes.ratingFlexContainer}>
                        {getIcon(entry.sport)}
                        <Rating
                            size='medium'
                            sx={{ alignItems: 'center' }}
                            precision={1}
                            readOnly
                            value={entry.rating}
                        />
                    </div>
                </Tooltip>
            ))}
        </>
    )
}

export default ProfileRating;