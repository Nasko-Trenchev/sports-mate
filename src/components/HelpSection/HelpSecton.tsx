import classes from './HelpSection.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpSection = () => {

    return (
        <>
            <h1 className={classes.helpSectionTitle}>How can we help you?</h1>
            <p className={classes.helpSectionP}>Here are a few of the questions we get the most.</p>
            <p className={classes.helpSectionP}>If you don't see what's on your mind, reach out to us per email.</p>
            <div className={classes.helpSectionContainer}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>What is SportsMate?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            SportsMate is a platform where you can find suitable groups to participate in four different sports (football,tennis,basketball, volleyball) in various locations.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>How to join an event?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To join a sport event you need to pick your desired sport and then browse the available options.
                            You can use the filters to limit the events to the most suitable ones for you.
                            Once you find the event that suits your desires, proceed to the details page where you`ll find
                            additional information and an option to join the event if your rank is sufficient for the game.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>How to create an event?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To create a sport event you need to pick your desired sport and then click the "Create Event"
                            button. There you`ll need to select the skill level for this event and specify location,
                            the number of the players and the exact datetime of the event.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>How does skill level work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            All players are eligible to join events created with "Novice" and "Beginner" skill levels.
                            To join events for "Advanced", "Expert" and "Professional" players, you`ll need to earn
                            your ranks by playing an event and then receive rating by the other players that played
                            in your game.
                            All players need at least 5 votes for a particular sport to confirm their skill level.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>How does ranking work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Every player has the opportunity to rate the other participants after the event is over.
                            In order to do so the creator of the event should first confirm the event completion from the details page of the event.
                            Once done all players that participated in the event will receive notification in their profiles
                            where they can submit their ratings for the others.
                            Every sport has a separate ranking, the skill level is calculated by the following formula:

                            The sum of the received stars / vote numbers.
                            Result is rounded up to a whole number.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>How to find an event location?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can check out the event location by opening the Google maps link,
                            located right below the name of the field in the details page of the event.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}

export default HelpSection;