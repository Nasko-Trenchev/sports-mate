import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CompleteEventSteps from './CompleteEventSteps';
import { SelectChangeEvent } from '@mui/material/Select';
import { useReducer, useState } from 'react'
import { auth } from '../../config/firebase';
import { useSubmit, useParams, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { loaderReturnArgs } from "../../pages/GameDetailsPage";
import classes from './CompleteEvent.module.css'


type reducerStateType = {
    Rating: {
        username: string,
        rating: number
    }[],
    Presence: string[],
    Comment: string
}
const reducerInitialValue = {
    Rating: [],
    Presence: [],
    Comment: '',
}

interface ReducerAction {
    type: string;
    payload: any;
}

const formReducer = (state: reducerStateType, action: ReducerAction) => {

    const { type, payload } = action;

    switch (type) {
        case "PRESENCE": {
            const currentUser = payload;
            let prevState = [...state.Presence]
            if (prevState.some((username) => username === currentUser)) {
                prevState = prevState.filter(username => username !== currentUser)
            }
            else {
                prevState.push(currentUser)
            }
            return {
                ...state,
                Presence: prevState
            }
        }
        case "RATING": {
            let prevState = [...state.Rating]
            const username = payload.user as string;
            const rating = payload.rating as number || 0;
            if (prevState.some((user) => user.username === username)) {
                const userIndex = prevState.findIndex((user) => user.username === username)
                prevState[userIndex].rating = rating;
            }
            else {
                prevState.push({ username, rating })
            }
            return {
                ...state,
                Rating: prevState
            }
        }
        case "COMMENT": {
            return {
                ...state,
                Comment: payload
            }
        }
    }
    return state;
}
const steps = ['Mark players presence', 'Rate players', 'Add additional information'];

export default function HorizontalLinearStepper() {

    const [activeStep, setActiveStep] = useState(0);
    // const [skipped, setSkipped] = useState(new Set<number>());
    const [formState, dispatchFormState] = useReducer(formReducer, reducerInitialValue);

    const submit = useSubmit();
    const navigate = useNavigate();
    const { sport, gameId } = useParams();
    const { sportDetails } = useRouteLoaderData('game-details') as loaderReturnArgs;


    const isStepOptional = (step: number) => {
        return step === 1 || step === 2;
    };

    // const isStepSkipped = (step: number) => {
    //     return skipped.has(step);
    // };

    const handleNext = () => {

        if (activeStep === steps.length - 1) {
            submit({
                sport: `${sport}`,
                id: `${gameId}`,
                rating: JSON.stringify(formState.Rating),
                presence: JSON.stringify(formState.Presence),
                comment: `${formState.Comment}`,
                game: JSON.stringify(sportDetails),
                user: `${auth.currentUser?.displayName}`
            },
                { method: "post", encType: "application/json" })
        }

        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleSkip = () => {

    //     if (!isStepOptional(activeStep)) {
    //         // You probably want to guard against something like this,
    //         // it should never occur unless someone's actively trying to break something.
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handlePresenceChange = (e: SelectChangeEvent<any>) => {
        dispatchFormState({ type: "PRESENCE", payload: e.target.name as string })
    }

    const handleRatingChange = (event: React.SyntheticEvent<Element, Event>, value: number | null, user: string) => {
        dispatchFormState({ type: "RATING", payload: { user: user, rating: value } })
    }
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatchFormState({ type: "COMMENT", payload: e.target.value })
    }

    return (
        <div className={classes.completeEventContainer}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    // const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    // if (isStepSkipped(index)) {
                    //     stepProps.completed = false;
                    // }
                    return (
                        <Step key={label} >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1, textAlign: 'center', marginTop: '5em' }}>
                        All steps completed - you&apos;re finished!
                        <div>
                            <Typography>Thank you!</Typography>
                        </div>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                        {/* <Box sx={{ flex: '1 1 auto'}} /> */}
                        <Button variant='contained' sx={{ justifySelf: 'center' }} onClick={() => navigate('/')}>Back to homepage</Button>
                    </Box>
                </>
            ) : (
                <>
                    <CompleteEventSteps
                        step={activeStep}
                        handlePresenceChange={handlePresenceChange}
                        handleRatingChange={handleRatingChange}
                        handleCommentChange={handleCommentChange}
                    />
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )} */}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
}