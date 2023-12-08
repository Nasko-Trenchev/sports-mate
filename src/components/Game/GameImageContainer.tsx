import { Stack } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { StyledEngineProvider } from '@mui/material/styles'
import { useState, } from "react";

import classes from './GameImageContainer.module.css';

const GameImageContainer: React.FC<{ coverImages: string[] }> = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? (props.coverImages!.length - 1) : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === props.coverImages!.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    }

    return (
        <StyledEngineProvider>
            <div className={classes.images}>
                <Stack height={"100%"} sx={{ borderRadius: '1em' }}>
                    <div className={classes.sliderStyles}>
                        <div className={classes.leftArrow} onClick={goToPrevious}><ArrowBackIosIcon sx={{ fontSize: '32px' }} /></div>
                        <div className={classes.rightArrow} onClick={goToNext}><ArrowForwardIosIcon sx={{ fontSize: '32px' }} /></div>
                        <div className={classes.coverImageContainer}>
                            <img src={props.coverImages?.[currentIndex]} alt="coverPhoto" />
                        </div>
                        <div className={classes.slideDots}>
                            {props.coverImages?.map((slide, slideInex) => (
                                <div key={slideInex} onClick={() => goToSlide(slideInex)}><FiberManualRecordIcon sx={{ fontSize: '16px' }} /></div>
                            ))}
                        </div>
                    </div>
                </Stack>
            </div>
        </StyledEngineProvider>
    )
}

export default GameImageContainer;