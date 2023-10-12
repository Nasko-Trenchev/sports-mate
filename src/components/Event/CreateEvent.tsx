import classes from './CreateEvent.module.css'
import { useReducer, useState } from 'react'
import { Select, Box, InputLabel, Button, FormControl, FormHelperText, MenuItem } from '@mui/material'
import { CreateSport } from '../../util/sportTypes';
import { footballFields, footballFieldsImage, tennisFields } from '../../util/constants';
import { auth } from '../../config/firebase';
import { useSubmit, useParams, Form } from "react-router-dom";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { StyledEngineProvider } from '@mui/material/styles'
import FieldSelector from '../Selectors/FieldSelector';
import CountSelector from '../Selectors/CountSelector';
import { StaticDatePicker } from '@mui/x-date-pickers';

const date = new Date();

const reducerInitialValue = {
    Image: '',
    Location: '',
    Owner: '',
    Players: [],
    SkillLevel: '',
    Time: new Date(),
    id: '',
    PlayersCount: '',
}

interface ReducerAction {
    type: string;
    payload: any;
}

const formReducer = (state: CreateSport, action: ReducerAction) => {

    const { type, payload } = action;
    switch (type) {
        case "SKILL": {
            return {
                ...state,
                SkillLevel: payload,
                Owner: auth.currentUser?.email
            }
        }
        case "FIELD": {
            const image = footballFieldsImage.find(x => x.location === payload)
            return {
                ...state,
                Location: payload,
                Image: image?.image
            }
        }
        case "COUNT": {
            const initialPlayers = [auth.currentUser?.email as string]
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
        "countError": false
    })

    const submit = useSubmit()
    const params = useParams();
    let field: string[];

    switch (params.sport) {
        case 'football':
            field = footballFields
            break;
        case 'tennis': field = tennisFields
            break;
        case 'basketball': field = []
            break;
        default: field = footballFields
    }

    const submitHandler = () => {

        if (formState.Location === '') {
            setFormErrors((state) => ({ ...state, "locationError": true }))
        }
        if (formState.SkillLevel === '') {
            setFormErrors((state) => ({ ...state, "skillError": true }))
        }
        if (formState.PlayersCount === '') {
            setFormErrors((state) => ({ ...state, "countError": true }))
        }

        if (Object.values(formErrors).some(x => x === true)) {
            submit({
                Image: `${formState.Image}`,
                Location: `${formState.Location}`,
                Owner: `${formState.Owner}`,
                Players: `${formState.Players}`,
                SkillLevel: `${formState.SkillLevel}`,
                Time: `${formState.Time}`,
                id: '',
                PlayersCount: `${formState.PlayersCount}`,
            }, { method: 'post' })

        }

    }

    return (
        <StyledEngineProvider>
            <Box className={classes.createContainer}>
                <h1>Create {`${params.sport}`} event</h1>
                <Form className={classes.formContainer}>
                    <FormControl error={formErrors.skillError} required sx={{ m: 1, minWidth: 320 }}>
                        <InputLabel id="skill-label">Select skill level</InputLabel>
                        <Select
                            labelId="skill-label"
                            id="skill"
                            value={formState.SkillLevel}
                            label="Select skill level"
                            name='skill'
                            onOpen={(e) => setFormErrors((state) => ({ ...state, "skillError": false }))}
                            onChange={(e) => dispatchFormState({ type: "SKILL", payload: e.target.value })}
                        >
                            <MenuItem value={"Beginner"}>Beginner</MenuItem>
                            <MenuItem value={"Advanced"}>Advanced</MenuItem>
                            <MenuItem value={"Expert"}>Expert</MenuItem>
                            <MenuItem value={"Professional"}>Professional</MenuItem>
                        </Select>
                        <FormHelperText>Select a skill level from the list</FormHelperText>
                    </FormControl>

                    <FieldSelector
                        id="field"
                        dispatch={(e) => dispatchFormState({ type: "FIELD", payload: e.target.value })}
                        fields={field}
                        value={formState.Location}
                        hasError={formErrors.locationError}
                        onOpen={(e) => setFormErrors((state) => ({ ...state, "locationError": false }))}
                    />
                    <CountSelector
                        id='count'
                        sport={params.sport!}
                        value={formState.PlayersCount}
                        dispatch={(e) => dispatchFormState({ type: "COUNT", payload: e.target.value })}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                        <DemoContainer components={['DateTimePicker']} sx={{ m: 1 }}>
                            <MobileDateTimePicker
                                sx={{ maxWidth: 320 }}
                                label="Select date "
                                defaultValue={dayjs(date)}
                                onChange={(newValue) => dispatchFormState({ type: "TIME", payload: newValue })}
                            />
                        </DemoContainer>
                        <FormHelperText className={classes.formHelper}>Select date and time for the event</FormHelperText>
                    </LocalizationProvider>
                    <div>
                        <Button onClick={submitHandler} className={classes.createBtn}>Submit</Button>
                    </div>
                </Form>
            </Box>
        </StyledEngineProvider >
    )
}

export default CreateEvent;
