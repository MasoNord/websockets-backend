import { ShipInterface } from "./ship.interface";

export interface UserInterface {
    id: number;
    name: string;
    password: string;
    ships: ShipInterface[]
    wins: number
}