import classes from './CreateEvent.module.css'
import { Form } from 'react-router-dom';
import { useReducer } from 'react'
import { Select, Box, InputLabel, Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { Sport } from '../../util/sportTypes';
import { Timestamp } from 'firebase/firestore'
import { footballFields, footballFieldsImage } from '../../util/constants';
import { auth } from '../../config/firebase';
import { useSubmit } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

const timestamp = Timestamp.now();

const reducerInitialValue = {
    Image: '',
    Location: '',
    Owner: '',
    Players: [],
    SkillLevel: 'Beginner',
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

    const submitHandler = () => {
        console.log("yes")
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
            <Box sx={{ minWidth: 120 }}>
                <Form>
                    <InputLabel id="skill">Skill</InputLabel>
                    <Select
                        labelId="skill"
                        id="skill"
                        value={formState.SkillLevel}
                        label="skill"
                        name='skill'
                        onChange={(e) => dispatchFormState({ type: "SKILL", payload: e.target.value })}
                    >
                        <MenuItem value={"Beginner"}>Beginner</MenuItem>
                        <MenuItem value={"Advanced"}>Advanced</MenuItem>
                        <MenuItem value={"Expert"}>Expert</MenuItem>
                        <MenuItem value={"Professional"}>Professional</MenuItem>
                    </Select>

                    <InputLabel id="field">Football field</InputLabel>
                    <Select
                        labelId="field"
                        id="field"
                        value={formState.Location}
                        label="field"
                        name='field'
                        onChange={(e) => dispatchFormState({ type: "FIELD", payload: e.target.value })}
                    >
                        {footballFields.map((field) => (
                            <MenuItem
                                key={field}
                                value={field}
                            >
                                {field}
                            </MenuItem>
                        ))}
                    </Select>

                    <InputLabel id="count">Count</InputLabel>
                    <Select
                        labelId="count"
                        id="count"
                        value={formState.PlayersCount}
                        label="count"
                        name='count'
                        onChange={(e) => dispatchFormState({ type: "COUNT", payload: e.target.value as string })}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                        <DemoContainer components={['DateTimePicker']}>
                            <MobileDateTimePicker
                                label="Basic date time picker"
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