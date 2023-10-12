import classes from './CreateEvent.module.css'
import { Form } from 'react-router-dom';
import { useReducer } from 'react'
import { Select, Box, InputLabel, Button, FormControl, FormHelperText, Container } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { Sport } from '../../util/sportTypes';
import { Timestamp } from 'firebase/firestore'
import { footballFields, footballFieldsImage, tennisFields } from '../../util/constants';
import { auth } from '../../config/firebase';
import { useSubmit, useParams } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import FieldSelector from '../Selectors/FieldSelector';
import CountSelector from '../Selectors/CountSelector';

const timestamp = Timestamp.now();

const reducerInitialValue = {
    Image: '',
    Location: '',
    Owner: '',
    Players: [],
    SkillLevel: '',
    Time: timestamp,
    id: '',
    PlayersCount: 0,
}

interface ReducerAction {
    type: string;
    payload: any;
}

const formReducer = (state: Sport, action: ReducerAction) => {

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
                PlayersCount: Number(payload),
                Players: initialPlayers
            }
        }
        case "TIME": {
            const date = new Date(payload)
            const firestore = Timestamp.fromDate(date)
            console.log(firestore.toDate())
            return {
                ...state,
                Time: firestore
            }
        }

    }
    return state;
}

const CreateEvent = () => {

    const [formState, dispatchFormState] = useReducer(formReducer, reducerInitialValue);

    const submit = useSubmit()
    const params = useParams();
    let field: string[];

    switch(params.sport){
        case 'football': 
        field = footballFields
        break;
        case 'tennis' : field = tennisFields
        break;
        case 'basketball': field = []
        break;
        default: field = footballFields
    }

    const submitHandler = () => {
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

    return (
        <>
            <Box className={classes.createContainer}>
                <h1>Create {`${params.sport}`} event</h1>
                <Form className={classes.formContainer}>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="skill-label">Select skill level</InputLabel>
                    <Select
                        labelId="skill-label"
                        id="skill"
                        value={formState.SkillLevel}
                        label="Select skill level"
                        name='skill'
                        onChange={(e) => dispatchFormState({ type: "SKILL", payload: e.target.value })}
                    >
                        <MenuItem value={"Beginner"}>Beginner</MenuItem>
                        <MenuItem value={"Advanced"}>Advanced</MenuItem>
                        <MenuItem value={"Expert"}>Expert</MenuItem>
                        <MenuItem value={"Professional"}>Professional</MenuItem>
                    </Select>
                    <FormHelperText>Select a supported field from the list</FormHelperText>
                    </FormControl>

                    <FieldSelector 
                     id="field" 
                     dispatch={(e) =>dispatchFormState({ type: "FIELD", payload: e.target.value })}
                     fields={field}
                     value={formState.Location}
                     />
                    <CountSelector 
                    id='count' 
                    sport={params.sport!}
                    value={formState.PlayersCount}
                    dispatch={(e) =>dispatchFormState({ type: "COUNT", payload: e.target.value })}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                        <DemoContainer components={['DateTimePicker']}>
                            <MobileDateTimePicker
                            sx={{minWidth: 300, m: 1}}
                                label="Select date "
                                value={formState.Time}
                                onChange={(newValue) => dispatchFormState({ type: "TIME", payload: newValue })}                   
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button onClick={submitHandler}>Submit</Button>
                </Form>
            </Box>
        </>
    )
}

export default CreateEvent;

// export async function action({ params, request }: ActionFunctionArgs) {

//     const data = await request.formData();

//     const jsonTime = data.get('Time') as string;

//     let regex = new RegExp(/[0-9]{3,}/gm)

//     let matches = regex.exec(jsonTime)![0]
 
//     let time = new Timestamp(Number(matches), 0)


//     const docRef = await addDoc(collection(db, `${params.sport}`), {
//         Image: data.get('Image'),
//         Location: data.get('Location'),
//         Owner: data.get('Owner'),
//         Players: arrayUnion(data.get('Players')),
//         SkillLevel: data.get('SkillLevel'),
//         Time: time,
//         PlayersCount: Number(data.get('PlayersCount')),
//     });

//     return redirect('/football')
// }