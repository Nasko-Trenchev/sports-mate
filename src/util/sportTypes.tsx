import { Timestamp } from "firebase/firestore"
import { profileData } from "../pages/ProfilePage"

export type Sport = {
    Image: string | undefined,
    Location: string,
    Owner: string | null | undefined,
    Players: string[],
    SkillLevel: string,
    Time: Timestamp,
    id: string,
    PlayersCount: number,
}

export type Sports = {
    Image: string
    Location: string,
    Owner: string,
    Players: string[],
    SkillLevel: string,
    Time: Timestamp,
    id: string,
    PlayersCount: number,
}[]

export type CreateSport = {
    Image: string | undefined,
    Location: string,
    Owner: string | null | undefined,
    Players: string[],
    SkillLevel: string,
    Time: string,
    id: string,
    PlayersCount: number,
}

export type combinedProfileData = {
    profile : profileData,
    image: string,
}