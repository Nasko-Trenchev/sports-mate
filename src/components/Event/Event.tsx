import classes from './Event.module.css'
import { Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import EventPagination from './EventPagination';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { SkillLevels } from '../../util/constants'
import { motion } from 'framer-motion';
import { getField } from '../../util/helperFunctions';
import CreateButton from '../CreateButton/CreateButton';
import { GamesTypes } from '../../util/sportTypes';
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
    const data = useRouteLoaderData('sport-details') as GamesTypes
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
            <div className={classes.emptyEventsPage}>
                <h1>Currently there aren`t any {params.sport} events </h1>
                <h2>Be the first one to create one</h2>
                <CreateButton path={`${params.sport!}/create`} style={"empty"} />
            </div>
        )
    }

    const uniqueOwners = Array.from(new Set(data.map((x) => x.Owner)))

    return (
        <StyledEngineProvider>
            <CreateButton path={`${params.sport!}/create`} style={"full"} />
            <h1>Meet your new {params.sport} mates</h1>
            <div className={classes.filterSection}>
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                        variant='contained'
                        sx={{ marginBottom: '1em' }}
                        size='small' onClick={() => setShowFilter(!showFilter)}>
                        {showFilter ? 'Hide filters' : "Show filters"}
                    </Button>
                </motion.div>
                {showFilter &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={classes.filtersMenu}>
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
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Button size='small' variant='contained' onClick={filterData}>Apply filters</Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Button size='small' variant='contained' onClick={resetFilters}>Reset filters</Button>
                            </motion.div>
                        </div>
                    </motion.div>}
            </div>
            {filteredData.length === 0 ? <h2>No events match your search criteria</h2> :
                <EventPagination data={filteredData} />
            }
        </StyledEngineProvider>
    )
}

export default Event;