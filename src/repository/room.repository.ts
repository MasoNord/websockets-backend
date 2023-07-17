import { resolveModuleNameFromCache } from "typescript";
import { RoomInterface} from "../interface/room.interface";
import { UserRepository } from "./users.repository";

import crypto from "crypto";

const userRepository = new UserRepository();


export class RoomRepository {
    private static rooms: RoomInterface;

    constructor() {
        RoomRepository.rooms = {roomId: crypto.randomInt(10000), roomUsers: [], idGame: crypto.randomInt(10000)};
    }
    
    public updateRoom(userId: number): boolean {
        
        if (this.checkUser(userId) === false) {
            RoomRepository.rooms.roomUsers.push(userRepository.findById(userId));
            return true;
        }else {
            console.log(`${userRepository.findById(userId).name} is already in the game room`);
        }

        return false;
    }
 
    public getRoom(): RoomInterface {
        return RoomRepository.rooms;
    }

    public getGameId(): number {
        return RoomRepository.rooms.idGame;
    }

    private checkUser(userId): boolean {
        for (let i = 0; i < RoomRepository.rooms.roomUsers.length; ++i) {
            if (userId === RoomRepository.rooms.roomUsers[i].id)
                return true;
        }
        return false;
    }
}