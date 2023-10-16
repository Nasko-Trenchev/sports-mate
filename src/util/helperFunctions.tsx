import dayjs from 'dayjs';


export const hoursLeft = (timeLeft: Date) => {

    const startDate = dayjs();
    const endDate = dayjs(timeLeft)

    const days = endDate.diff(startDate, 'd')
    const hours = endDate.diff(startDate, 'hours')
    const minutes = endDate.diff(startDate, 'm')

    if (days > 0) {
        return {
            time: days,
            timeLeft: `Time left: ${days} ${days > 1 ? 'days' : 'day'}`
        }
    }

    if (hours > 1) {
        return {
            time: hours,
            timeLeft: `Time left: ${hours} hours ${hours > 1 ? 'hours' : 'hour'}`
        }
    }

    if (minutes > 1) {
        return {
            time: minutes,
            timeLeft: `Time left: ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`
        }
    }

    return {
        time: 0,
        timeLeft: `Event started`
    }
}