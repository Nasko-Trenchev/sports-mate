import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import classes from './FieldSelector.module.css'
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl } from '@mui/material'
import { availableSkills } from '../Event/CreateEvent';

interface SkillSelectors {
    id: string,
    dispatch: (e: SelectChangeEvent<any>) => void,
    skills: availableSkills;
    value?: string,
    onOpen?: (e: object) => void,
    hasError?: boolean,
    name?: string,
    labelText: string

}

const SkillSelector: React.FC<SkillSelectors> = (props) => {

    return (
        <div className={classes.selector}>
            <FormControl required sx={{ m: 0.5, minWidth: 320 }} error={props.hasError} size='small'>
                <InputLabel id={`${props.id}-label`}>{props.labelText}</InputLabel>
                <Select
                    labelId={`${props.id}-label`}
                    id={props.id}
                    value={props.value}
                    label={props.labelText}
                    name={props.name || props.id}
                    onChange={(e) => props.dispatch(e)}
                    className={classes.selectElement}
                    onOpen={props.onOpen}
                >
                    {props.skills.map((field) => (
                        <MenuItem
                            key={field.skill}
                            value={field.skill}
                            disabled={field.eligible}

                        >
                            {field.skill}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Select a supported value from the list</FormHelperText>
            </FormControl>
        </div>

    )
}

export default SkillSelector;