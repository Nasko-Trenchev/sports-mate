import { Sports } from "../../util/sportTypes";
import { Stack, Divider, Pagination, Box } from "@mui/material";
import { useState } from "react";
import classes from './EventPagination.module.css'
import Game from "../Game/Game";

const EventPagination: React.FC<{ data: Sports }> = (props) => {

    const [page, setPage] = useState(1);

    const itemsPerPage = 5;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedItems = props.data.slice(startIndex, endIndex);

    return (
        <Stack
            direction={"column"}
            divider={<Divider orientation="horizontal" sx={{ color: "black" }} flexItem />}
            spacing={0}
            className={classes.gamesContainer}>
            {displayedItems.map((game, index) => (
                <Game key={game.id} data={displayedItems[index]} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                <Pagination
                    count={Math.ceil(props.data.length / itemsPerPage)}
                    page={page}
                    onChange={(event, page) => setPage(page)}
                />
            </Box>
        </Stack>
    )

}

export default EventPagination;