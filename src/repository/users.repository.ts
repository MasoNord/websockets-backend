import { ShipInterface } from "../interface/ship.interface";
import { UserInterface } from "../interface/users.interface";

export class UserRepository {
    private static users: UserInterface[] = [];

    public addUser(id: number, name: string, password: string): boolean {

        if (this.findByName(name) !== undefined) {
            if (this.findByName(name).password !== password) {
                console.log("Incorrect password");
                return false;
            } else {
                console.log("Welcome back");
                this.changeId(name, id);
            }
        }else {
            const user = {id: id, name: name, password: password, ships: null, wins: 0};
            UserRepository.users.push(user); 
        }

        return true;
    }

    public findById(id: number): UserInterface{ 
        for (let i = 0; i < UserRepository.users.length; ++i) {
            if (id === UserRepository.users[i].id)
                return UserRepository.users[i];
        }

        return undefined;
    }

    public findByName(name: string): UserInterface {
        for (let i = 0; i < UserRepository.users.length; ++i) {
            if (name === UserRepository.users[i].name)
                return UserRepository.users[i];
        }
        
        return undefined;
    }

    public getIndex(id: number): number {
        for (let i = 0; i < UserRepository.users.length; ++i) {
            if (id === UserRepository.users[i].id)
                return i;
        }

        return undefined;
    }

    public getUsers(): UserInterface[] {
        return UserRepository.users;
    }

    public removeUser(id: number): void {
       if (this.getIndex(id) !== undefined) {
            UserRepository.users.splice(this.getIndex(id), 1);
       }
    }

    private changeId(name: string, newId: number): void {
        for (let i = 0; i < UserRepository.users.length; ++i) {
            if (name === UserRepository.users[i].name) {
                UserRepository.users[i].id = newId;
                return;
            }
                
        }
    }
}