import classes from './Game.module.css';

const Game = () => {

    return (
        <div className={classes.game}>
            <div className={classes.imgContainer}>
                <img src="https://t3.ftcdn.net/jpg/00/34/24/96/360_F_34249698_Oun7sm6fNLKUXpAtzgue06sTMyHSxwgB.jpg" alt="1" />
            </div>
            <div>
                <p>Location: asdas</p>
                <p>Time:</p>
            </div>
            <div>
                <p>Created by: Asen</p>
                <p>Skill level: Masters</p>
            </div>
            <div>

            </div>
            <div>
                <p>7/8 spots filled</p>
            </div>
            <button>Join event</button>
        </div>

    )
}

export default Game;