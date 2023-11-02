import classes from './Event.module.css'
import { Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import EventPagination from './EventPagination';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { SkillLevels } from '../../util/constants'
import { getField } from '../../util/helperFunctions';
import CreateEvent from '../CreateButton/CreateButton';
import { Sports } from '../../util/sportTypes';
import { useState } from 'react';
import { isEventOver } from '../../util/helperFunctions';
import FieldSelector from '../Selectors/FieldSelector';

const initialState = {
    Location: "",
    SkillLevel: "",
    Owner: "",
    OnlyWithEmptySpots: false,
    OnlyUpcomingEvents: false,
}

const Event: React.FC = () => {
    const params = useParams();
    const data = useRouteLoaderData('sport-details') as Sports
    const [filteredData, setFilteredData] = useState(data)
    const [showFilter, setShowFilter] = useState(false)
    const [filters, setFilters] = useState(initialState)

    const handleFiltersChange = (e: SelectChangeEvent<any>, checked?: boolean) => {
        if (checked !== undefined) {
            if (e.target.name === "OnlyWithEmptySpots") {
                setFilters({
                    ...filters,
                    OnlyWithEmptySpots: checked
                });
            }
            else {
                setFilters({
                    ...filters,
                    OnlyUpcomingEvents: checked
                });
            }
        }
        else {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value,
            });
        }
    }

    function resetFilters() {
        setFilters(initialState)
        setFilteredData(data)
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
        if (filters.OnlyUpcomingEvents) {
            filteredData = filteredData.filter(x => isEventOver(x.Time.toDate()))
        }
        setFilteredData(filteredData)
    }

    const field = getField(params.sport)

    if (data.length === 0) {
        return (
            <>
                <h1>Currently there aren`t any events for this sport</h1>
                <h2>Be the first one to create an event</h2>
                <CreateEvent />
            </>
        )
    }

    const uniqueOwners = Array.from(new Set(data.map((x) => x.Owner)))

    return (
        <StyledEngineProvider>
            <div className={classes.eventHeader}>
                <h1>There {data.length > 1 ? "are" : "is"} {data.length} upcoming {params.sport} {data.length > 1 ? "events" : "event"}</h1>
                <CreateEvent />
            </div>
            <div className={classes.filterSection}>
                <Button
                    variant='contained'
                    sx={{ marginBottom: '1em' }}
                    size='small' onClick={() => setShowFilter(!showFilter)}>
                    {showFilter ? 'Hide filters' : "Show filters"}
                </Button>
                {showFilter && <div className={classes.createButton}>
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
                    <FormGroup className={classes.filterCheckbox}>
                        <FormControlLabel
                            control={<Checkbox name='OnlyWithEmptySpots' onChange={(e, checked) => handleFiltersChange(e, checked)} checked={filters.OnlyWithEmptySpots} />}
                            label="Only groups that aren`t full yet" />
                    </FormGroup>
                    <FormGroup className={classes.filterCheckbox}>
                        <FormControlLabel
                            control={<Checkbox name='OnlyUpcomingEvents' onChange={(e, checked) => handleFiltersChange(e, checked)} checked={filters.OnlyUpcomingEvents} />}
                            label="Only upcomming events" />
                    </FormGroup>
                    <div className={classes.filterBtns}>
                        <Button size='small' variant='contained' onClick={filterData}>Apply filters</Button>
                        <Button size='small' variant='contained' onClick={resetFilters}>Reset filters</Button>
                    </div>
                </div>}
            </div>
            <h2>Currently opened groups</h2>
            {filteredData.length === 0 ? <h2>No events match your search criteria</h2> :
                <EventPagination data={filteredData} />
            }

        </StyledEngineProvider>
    )
}

export default Event;