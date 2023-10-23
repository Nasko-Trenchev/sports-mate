import classes from './Event.module.css'
import { Stack, Divider, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { SkillLevels } from '../../util/constants'
import { getField } from '../../util/helperFunctions';
import CreateEvent from '../CreateButton/CreateButton';
import Game from '../Game/Game'
import { Sport, Sports } from '../../util/sportTypes';
import { useState } from 'react';
import FieldSelector from '../Selectors/FieldSelector';


const Event: React.FC = () => {
    const params = useParams();
    const data = useRouteLoaderData('sport-details') as Sports
    const [filteredData, setFilteredData] = useState(data)
    const [filters, setFilters] = useState({
        Location: "",
        SkillLevel: "",
        Owner: "",
        OnlyWithEmptySpots: false,
    })

    const handleFiltersChange = (e: SelectChangeEvent<any>, checked?: boolean) => {
        if (checked !== undefined) {
            setFilters({
                ...filters,
                OnlyWithEmptySpots: checked
            });
        }
        else {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value,
            });
        }

    }

    function filterData() {
        let filteredData = data.filter(item => {
            return (
                (filters.Location === '' || item.Location === filters.Location) &&
                (filters.Owner === '' || item.Owner === filters.Owner) &&
                (filters.SkillLevel === '' || item.SkillLevel === filters.SkillLevel)
            );
        });

        if (filters.OnlyWithEmptySpots) {
            filteredData = filteredData.filter(x => x.Players.length < x.PlayersCount)
        }
        setFilteredData(filteredData)
    }

    const field = getField(params.sport)

    if (data.length === 0) {
        return (
            <h1>Currently there aren`t any events for this sport</h1>
        )
    }

    const uniqueOwners = Array.from(new Set(data.map((x) => x.Owner)))

    return (
        <>
            <h1>There {data.length > 1 ? "are" : "is"} {data.length} upcoming {params.sport} {data.length > 1 ? "events" : "event"}</h1>
            <div className={classes.createButton}>
                <CreateEvent />
            </div>
            <h2>Find your spot</h2>
            <FieldSelector
                id="field"
                dispatch={(e) => handleFiltersChange(e)}
                fields={field}
                value={filters.Location}
                name='Location'
                labelText='Select Location'
            />
            <FieldSelector
                id="owner"
                dispatch={(e) => handleFiltersChange(e)}
                fields={uniqueOwners}
                value={filters.Owner}
                name='Owner'
                labelText='Select Owner'
            />
            <FieldSelector
                id="skill"
                dispatch={(e) => handleFiltersChange(e)}
                fields={SkillLevels}
                value={filters.SkillLevel}
                name='SkillLevel'
                labelText='Select skill'
            />
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox name='OnlyWithEmptySpots' onChange={(e, checked) => handleFiltersChange(e, checked)} />}
                    label="Only groups that aren`t full yet" />
            </FormGroup>
            <h2>Currently opened groups</h2>
            <button onClick={filterData}>Apply filter</button>

            <Stack
                direction={"column"}
                divider={<Divider orientation="horizontal" sx={{ color: "black" }} flexItem />}
                spacing={0}
                className={classes.gamesContainer}>
                {filteredData.map((game: Sport, index: number) => (
                    <Game key={game.id} data={filteredData[index]} />
                ))}
            </Stack>

        </>
    )
}

export default Event;