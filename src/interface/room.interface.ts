import { UserInterface } from "./users.interface";

export interface RoomInterface {
    roomId: number,
    roomUsers: UserInterface[],
    idGame: number
}
