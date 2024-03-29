import classes from './CreateEvent.module.css'
import { useReducer, useState } from 'react'
import { Box, Button, FormHelperText } from '@mui/material'
import { CreateGame } from '../../util/sportTypes';
import { FieldsImage } from '../../util/constants';
import { auth } from '../../config/firebase';
import { useSubmit, useParams, Form, useLoaderData } from "react-router-dom";
import dayjs from 'dayjs';
import SkillSelector from '../Selectors/SkillSelector';
import { SkillLevels } from '../../util/constants'
import Snackbar from '@mui/material/Snackbar';
import { SnackbarAlert } from '../Alert/Alert';
import useNotification from '../../hooks/useNotification';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { StyledEngineProvider } from '@mui/material/styles'
import { getField } from '../../util/helperFunctions';
import { isPlayerSkillLevelEnought } from '../../util/helperFunctions';
import FieldSelector from '../Selectors/FieldSelector';
import CountSelector from '../Selectors/CountSelector';
import { profileData } from '../../pages/ProfilePage';

const date = new Date();

const reducerInitialValue = {
    Image: '',
    Location: '',
    Owner: '',
    Players: [],
    SkillLevel: '',
    Time: '',
    id: '',
    PlayersCount: '',
    Completed: false,
    Raters: [],
    sport: ''
}

interface ReducerAction {
    type: string;
    payload: any;
}

type createEventLoaderData = {
    user: profileData;
}

export type availableSkills = {
    skill: string,
    eligible: boolean;
}[]

const formReducer = (state: CreateGame, action: ReducerAction) => {

    const { type, payload } = action;
    switch (type) {
        case "SKILL": {
            return {
                ...state,
                SkillLevel: payload,
                Owner: auth.currentUser?.displayName
            }
        }
        case "FIELD": {
            const image = FieldsImage.find(x => x.location === payload)
            return {
                ...state,
                Location: payload,
                Image: image?.image
            }
        }
        case "COUNT": {
            const initialPlayers = [auth.currentUser?.displayName as string]
            return {
                ...state,
                PlayersCount: payload,
                Players: initialPlayers
            }
        }
        case "TIME": {
            return {
                ...state,
                Time: payload
            }
        }
    }
    return state;
}

const CreateEvent = () => {

    const [formState, dispatchFormState] = useReducer(formReducer, reducerInitialValue);
    const [formErrors, setFormErrors] = useState({
        "locationError": false,
        "skillError": false,
        "countError": false,
        'dateError': false
    })

    const { user } = useLoaderData() as createEventLoaderData;
    const submit = useSubmit();
    const params = useParams();

    const { openNotification, closeNotification, actionOption } = useNotification();

    const field = getField(params.sport)

    const avaialbleSkillsToPlayer = SkillLevels.reduce((acc, curr) => {

        if (isPlayerSkillLevelEnought(user, curr, params.sport!)) {
            acc.push({ skill: curr, eligible: false })
        }
        else {
            acc.push({ skill: curr, eligible: true })
        }

        return acc;
    }, [] as availableSkills)

    const submitHandler = () => {

        if (formState.Location === '' || formState.SkillLevel === '' || formState.PlayersCount === '' || formState.Time === '') {
            if (formState.SkillLevel === '') {
                setFormErrors((state) => ({ ...state, "skillError": true }))
            }
            if (formState.PlayersCount === '') {
                setFormErrors((state) => ({ ...state, "countError": true }))
            }
            if (formState.Location === '') {
                setFormErrors((state) => ({ ...state, "locationError": true }))
            }
            if (formState.Time === '') {
                setFormErrors((state) => ({ ...state, "dateError": true }))
            }
            openNotification("Please fill in all the required fields", 'error');
            return;
        }

        if (!(Object.values(formErrors).some(x => x !== false))) {

            openNotification("Sucessfully created event", 'success');

            submit({
                Image: `${formState.Image}`,
                Location: `${formState.Location}`,
                Owner: `${formState.Owner}`,
                Players: `${formState.Players}`,
                SkillLevel: `${formState.SkillLevel}`,
                Time: `${formState.Time}`,
                id: '',
                PlayersCount: `${formState.PlayersCount}`,
                sport: `${params.sport}`
            }, { method: 'post' })

        }
    }

    return (
        <StyledEngineProvider>
            <Box className={classes.createContainer}>
                <h1>Create {`${params.sport}`} event</h1>
                <Form className={classes.formContainer}>
                    <SkillSelector
                        id="skill"
                        dispatch={(e) => dispatchFormState({ type: "SKILL", payload: e.target.value })}
                        skills={avaialbleSkillsToPlayer}
                        value={formState.SkillLevel}
                        name='SkillLevel'
                        labelText='Select skill'
                    />
                    <FieldSelector
                        id="field"
                        dispatch={(e) => dispatchFormState({ type: "FIELD", payload: e.target.value })}
                        fields={field}
                        value={formState.Location}
                        hasError={formErrors.locationError}
                        labelText='Select Location'
                        onOpen={(e) => setFormErrors((state) => ({ ...state, "locationError": false }))}
                    />
                    <CountSelector
                        id='count'
                        sport={params.sport!}
                        value={formState.PlayersCount}
                        dispatch={(e) => dispatchFormState({ type: "COUNT", payload: e.target.value })}
                        hasError={formErrors.countError}
                        onOpen={(e) => setFormErrors((state) => ({ ...state, "countError": false }))}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                        <DemoContainer components={['DateTimePicker']} sx={{ m: 1 }}>
                            <MobileDateTimePicker
                                slotProps={{
                                    textField: {
                                        error: formErrors.dateError
                                    },
                                }}
                                sx={{ maxWidth: 320 }}
                                onOpen={() => setFormErrors((state) => ({ ...state, "dateError": false }))}
                                onError={() => setFormErrors((state) => ({ ...state, "dateError": true }))}
                                onChange={(newValue) => dispatchFormState({ type: "TIME", payload: newValue })}
                                label="Select date"
                                defaultValue={dayjs(date)}
                                minDateTime={dayjs(date)}
                            />
                        </DemoContainer>
                        <FormHelperText className={classes.formHelper}>Select date and time for the event</FormHelperText>
                    </LocalizationProvider>
                    <div className={classes.createBtn}>
                        <Button variant="contained" onClick={submitHandler} sx={{ marginTop: 3 }}>Submit</Button>
                    </div>
                </Form>
            </Box>
            <Snackbar
                open={actionOption.open}
                autoHideDuration={3000}
                onClose={(event) => closeNotification(event, undefined, actionOption.color)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <SnackbarAlert onClose={(e) => closeNotification(e, undefined ,actionOption.color)} severity={actionOption.color}>
                    {actionOption.message}
                </SnackbarAlert>
            </Snackbar>
        </StyledEngineProvider >
    )
}

export default CreateEvent;
