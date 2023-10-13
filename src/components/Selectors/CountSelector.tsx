import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { InputLabel, FormControl } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';

interface CountSelectorProps {
    id: string,
    dispatch: (e: SelectChangeEvent<any>) => void,
    sport: string,
    value?: string | number,
    onOpen: (e: object) => void,
    hasError: boolean,
}

const CountSelector: React.FC<CountSelectorProps> = (props) => {


    const footballCount = [10, 12, 16, 18, 22];
    const tennisCount = [2, 4];
    const basketballCount = [4, 6, 8, 10];

    return (
        <>
            <FormControl error={props.hasError} required sx={{ m: 1, minWidth: 320 }}>
                <InputLabel id="count-label">Select players count</InputLabel>
                <Select
                    labelId="count-label"
                    id={props.id}
                    label="Select players count"
                    value={props.value}
                    name={props.id}
                    onChange={(e) => props.dispatch(e)}
                    onOpen={props.onOpen}
                >
                    {props.sport === 'football' &&
                        footballCount.map((count) => (
                            <MenuItem key={count} value={count}>
                                {count}
                            </MenuItem>
                        ))
                    }
                    {props.sport === 'tennis' &&
                        tennisCount.map((count) => (
                            <MenuItem key={count} value={count}>
                                {count}
                            </MenuItem>
                        ))
                    }
                    {props.sport === 'basketball' &&
                        basketballCount.map((count) => (
                            <MenuItem key={count} value={count}>
                                {count}
                            </MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>Select the number of players</FormHelperText>
            </FormControl>
        </>

    )
}

export default CountSelector;