import { Player } from "./player.ts";

export class RoomAction {
    timestamp = 0;
    action = "";
}

export class Room {
    title = "A Room";
    description = "A room.";
    shortDescription = "room";
    occupants : Player[] = [];
    recentActions : RoomAction[] = [];

    constructor (title: string, description: string, shortDescription: string) {
        this.title = title;
        this.description = description;
        this.shortDescription = shortDescription;
    }
}