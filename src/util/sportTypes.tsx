import { Timestamp } from "firebase/firestore"
import { profileData } from "../pages/ProfilePage"

export type GameType = {
    Image: string | undefined,
    Location: string,
    Owner: string,
    Players: string[],
    SkillLevel: string,
    Time: Timestamp,
    id: string,
    PlayersCount: number,
    Completed: boolean,
    HasRated?: boolean,
    sport: string
}

export type GamesTypes = {
    Image: string | undefined,
    Location: string,
    Owner: string,
    Players: string[],
    SkillLevel: string,
    Time: Timestamp,
    id: string,
    PlayersCount: number,
    Completed: boolean,
    HasRated?: boolean,
    sport: string
}[]

export type CreateGame = {
    Image: string | undefined,
    Location: string,
    Owner: string | null | undefined,
    Players: string[],
    SkillLevel: string,
    Time: string,
    id: string,
    PlayersCount: number,
    Completed: boolean,
    sport: string
}

export type combinedProfileData = {
    profile: profileData,
    image: string,
}

export type CommentsData = {
    user: string,
    comment: string,
    date: Timestamp,
    image?: string
}[]