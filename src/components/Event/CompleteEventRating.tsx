import { Rating } from "@mui/material";
import { ratingLabels } from "../../util/constants";
import { useState } from "react";
import React from "react";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

type RatingProps = {
    handleRatingChange: (e: React.SyntheticEvent<Element, Event>, value: number | null, user: string) => void
    userName: string
}

const CompleteEventRating: React.FC<RatingProps> = (props) => {

    const [value, setValue] = useState<number | null>(0);
    const [hover, setHover] = useState(0);

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${ratingLabels[value]}`;
    }

    const handleValueChange = (e: React.SyntheticEvent<Element, Event>, value: number | null, user: string) => {
        setValue(value)
        props.handleRatingChange(e, value, user)
    }

    return (
        <Box
            sx={{
                width: 150,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                size='small'
                name={props.userName}
                value={value}
                precision={1}
                onChange={(event, value) => handleValueChange(event, value, props.userName)}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                getLabelText={getLabelText}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    )
}

export default CompleteEventRating;