import dayjs from 'dayjs';
import { FootballFields, BasketballFields, TennisFields, VolleyballFields } from './constants';
import { profileData } from '../pages/ProfilePage';
import { SkillLevelCodes } from './constants';

export const hoursLeft = (timeLeft: Date) => {

    const startDate = dayjs();
    const endDate = dayjs(timeLeft)

    const days = endDate.diff(startDate, 'd')
    const hours = endDate.diff(startDate, 'hours')
    const minutes = endDate.diff(startDate, 'm')

    if (days > 0) {
        return {
            time: days,
            timeRemaining: `Time left: > ${days} ${days > 1 ? 'days' : 'day'}`
        }
    }

    if (hours > 0) {
        return {
            time: hours,
            timeRemaining: `Time left: > ${hours} ${hours > 1 ? 'hours' : 'hour'}`
        }
    }

    if (minutes > 0) {
        return {
            time: minutes,
            timeRemaining: `Time left: ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`
        }
    }
    if (minutes <= 0) {
        return {
            time: 0,
            timeRemaining: `Event over`
        }
    }

    return {
        time: 0,
        timeRemaining: `Event started`
    }
}

export const isEventOver = (dueDate: Date) => {
    const startDate = dayjs();
    const endDate = dayjs(dueDate)
    const difference = startDate.diff(endDate);
    if (difference > 0) {
        return true
    }
    return false;
}

export const getField = (sport: string | undefined) => {

    let field: string[];

    switch (sport) {
        case 'football':
            field = FootballFields
            break;
        case 'tennis': field = TennisFields
            break;
        case 'basketball': field = BasketballFields
            break;
        case 'volleyball': field = VolleyballFields
            break;
        default: field = []
    }

    return field;
}

export const getUserRating = (user: profileData) => {

    let footballRating = 0;
    let tennisRating = 0;
    let basketballRating = 0;
    let volleyballRating = 0;

    if (user.footballVotes && user.footballRating) {
        footballRating = Math.round(user.footballRating / user.footballVotes);
    }

    if (user.tennisRating && user.tennisVotes) {
        tennisRating = Math.round(user.tennisRating / user.tennisVotes);
    }
    if (user.volleyballRating && user.volleyballVotes) {
        basketballRating = Math.round(user.volleyballRating / user.volleyballVotes);
    }
    if (user.basketballRating && user.basketballVotes) {
        volleyballRating = Math.round(user.basketballRating / user.basketballVotes);
    }

    return [{
        sport: "Football",
        rating: footballRating,
        votes: user.footballVotes
    },
    {
        sport: "Tennis",
        rating: tennisRating,
        votes: user.tennisVotes
    },
    {
        sport: "Volleyball",
        rating: volleyballRating,
        votes: user.volleyballVotes
    },
    {
        sport: "Basketball",
        rating: basketballRating,
        votes: user.basketballVotes
    }]
}


export const isPlayerSkillLevelEnought = (user: profileData, eventSkillLevel: string, sport: string) => {

    const userRating = getUserRating(user).find(x => x.sport.toLowerCase() === sport);
    const eventSkill = SkillLevelCodes[eventSkillLevel as keyof typeof SkillLevelCodes];

    if (eventSkill === 1 || eventSkill == 2) {
        return true;
    }

    if (userRating && userRating.votes) {

        if (userRating?.rating >= eventSkill && userRating.votes >= 5) {
            return true
        }
    }

    return false;
}

export const getPalyerLevelAsString = (votes: number | undefined, rating: number | undefined) => {
    if (votes === undefined || votes < 5) {
        return `Not enought votes yet. A minimum of 5 votes are required to confirm that skill. 
        Received ${votes !== undefined ? votes : "none"} so far.`
    }
    let tooltipTitle;
    switch (rating) {
        case 5: tooltipTitle = "Professional";
            break;
        case 4: tooltipTitle = "Expert";
            break;
        case 3: tooltipTitle = "Advanced";
            break;
        case 2: tooltipTitle = "Beginner";
            break;
        case 1: tooltipTitle = "Novice";
            break;
    }

    return `${tooltipTitle} (${votes} votes).`
}