import { Timestamp } from "firebase/firestore"

export type Sport = {
    Image: string
    Location: string,
    Owner: string,
    Players: string[],
    SkillLevel: string,
    Time: Timestamp,
    id: string,
}[]
