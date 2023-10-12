import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import classes from './FieldSelector.module.css'
import { InputLabel, FormControl } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';

interface FieldSelectorProps {
    id: string,
    dispatch: (e: SelectChangeEvent<any>) => void,
    fields: string[],
    value: string,
    onOpen: (e: object) => void,
    hasError: boolean,

}

const FieldSelector: React.FC<FieldSelectorProps> = (props) => {

    return (
        <div className={classes.selector}>
            <FormControl required sx={{ m: 1, minWidth: 320 }} error={props.hasError}>
                <InputLabel id="field-label">Select location</InputLabel>
                <Select
                    labelId="field-label"
                    id={props.id}
                    value={props.value}
                    label="Select location"
                    name={props.id}
                    onChange={(e) => props.dispatch(e)}
                    className={classes.selectElement}
                    onOpen={props.onOpen}
                >
                    {props.fields.map((field) => (
                        <MenuItem
                            key={field}
                            value={field}
                        >
                            {field}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Select a supported location from the list</FormHelperText>
            </FormControl>
        </div>

    )
}

export default FieldSelector;