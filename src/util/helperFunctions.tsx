import dayjs from 'dayjs';
import { FootballFields, FootballFieldsImage, TennisFields } from './constants';



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
    if (minutes < -1) {
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

export const isEventOver = (timeLeft: Date) => {
    const startDate = dayjs();
    const endDate = dayjs(timeLeft)
    if (startDate < endDate) {
        return true
    }
    return false
}

export const getField = (sport: string | undefined) => {

    let field: string[];

    switch (sport) {
        case 'football':
            field = FootballFields
            break;
        case 'tennis': field = TennisFields
            break;
        case 'basketball': field = []
            break;
        default: field = FootballFields
    }

    return field;
}