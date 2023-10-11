import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';

interface FieldSelectorProps {
    id: string,
    dispatch: (e: SelectChangeEvent<any>) => void,
    fields: string[]
}

const FieldSelector: React.FC<FieldSelectorProps> = (props) => {

    return (
        <>
            <InputLabel id="field">Select field</InputLabel>
            <Select
                labelId={props.id}
                id={props.id}
                label={props.id}
                name={props.id}
                onChange={(e) => props.dispatch(e)}
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
        </>

    )
}

export default FieldSelector;