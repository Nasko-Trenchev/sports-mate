import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';

interface CountSelectorProps {
    id: string,
    dispatch: (e: SelectChangeEvent<any>) => void,
    sport: string,
    value?: string | number
}

const CountSelector: React.FC<CountSelectorProps> = (props) => {


    const footballCount = [10, 12, 16, 18, 22];
    const tennisCount = [2, 4];
    const basketballCount = [4, 6, 8, 10];
    
    return (
        <>
            <InputLabel id={props.id}>Count</InputLabel>
            <Select
                labelId={props.id}
                id={props.id}
                label={props.id}
                name={props.id}
                onChange={(e) => props.dispatch(e)}
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
        </>

    )
}

export default CountSelector;