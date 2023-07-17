import {WebSocketServer, WebSocket, RawData} from 'ws';
import crypto from "crypto";

import { httpServer } from "../http_server/index";
import {RequestParser} from "../util/request-parser";
import { UserRepository } from '../repository/users.repository';
import { RoomRepository } from '../repository/room.repository';

const wss = new WebSocketServer({port: 3000});
const userRepository = new UserRepository();
const roomRepository = new RoomRepository();
const requestParser = new RequestParser();
const clients = new Map<number, WebSocket>();



wss.on("connection", function connection(ws: WebSocket) {    
    console.log("New WebSocket connection");

    const userId: number = crypto.randomInt(10000);
    const roomId: number = crypto.randomInt(10000);
    
    ws.on("error", console.error);

    ws.on("message", function message(data: RawData) {
        const request: string = requestParser.TypeParser(data.toString());
        var response: any;
        
        try {
            switch(request) {
            case "reg":                
                clients.set(userId, ws);
                var logPass = requestParser.DataParser(data.toString());  
                
                if (userRepository.addUser(userId, logPass.name, logPass.password)) {
                    ws.send(JSON.stringify({type: "reg", data: JSON.stringify({"name": logPass.name, "index": userId, "error": false, "errorText": "" }), id: 0}));
                }
                
                break; 
            case "create_room": 
                roomRepository.updateRoom(userId);
                
                for (let i = 0; i < userRepository.getUsers().length; ++i) {
                    clients.get(userRepository.getUsers()[i].id).send(JSON.stringify(
                        {
                            type: "update_room",
                            data: JSON.stringify(
                            [
                                {
                                    "roomId": roomRepository.getRoom().roomId,
                                    "roomUsers": [
                                        { 
                                            "name": userRepository.getUsers()[i].name,
                                            "index": i
                                        }
                                    ]
                                }
                            ]
                            ),
                            id: 0
                        }  
                    ));
                }

                break;
            case "add_user_to_room":
                if (roomRepository.updateRoom(userId)) {
                    
                    for(let i = 0; i < roomRepository.getRoom().roomUsers.length; ++i) {
                        clients.get(roomRepository.getRoom().roomUsers[i].id).send(JSON.stringify(
                            {type: "create_game", data: JSON.stringify({"idGame": roomRepository.getGameId(), "idPlayer": roomRepository.getRoom().roomUsers[i].id})}
                        ));
                    }
                }

                break;
            
            case "add_ships":
                userRepository.findById(userId).ships = requestParser.DataParser(data.toString()).ships
                let counter = userRepository.findById(userId).ships.length;
                
                if (counter === 20) {
                    for (let i = 0; i < roomRepository.getRoom().roomUsers.length; ++i) {
                        clients.get(roomRepository.getRoom().roomUsers[i].id).send(JSON.stringify(
                            {
                                type: "start_game",
                                data: JSON.stringify(
                                    {
                                        "ships": [
                                            roomRepository.getRoom().roomUsers[i].ships
                                        ]
                                    }
                                ) // end up here
                            }
                        ));
                    }
                }

                break;
            default:
                console.log("Wrong request name");
                break;
            }

            // if (roomRepository.findById(roomId).roomUsers.length === 2) {
            //     // send start_game request to the client
            // }
        }catch(err) {
            console.log(err);
        }

        
    });

    ws.on("close", function() {
        clients.delete(userId);
    })
});