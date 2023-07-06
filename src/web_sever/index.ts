import {WebSocketServer, WebSocket} from 'ws';
import crypto from "crypto";

const wss = new WebSocket.Server({port: 3000});
const clients = new Map<string, any>();

wss.on("connection", function connection(ws) {
    console.log("New WebSocket connection");

    ws.on("message", function message(data) {
        console.log("recieve: %s", data);
    });

    ws.send("something");

});

// httpServer.on("upgrade", (req, socket, head) => {
//     socket.on("error", (err) => {
//         if (err) console.log(err);
//     });
//     if (!!req.headers["BadAuth"]) {
//         socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
//         socket.destroy();
//         return;
//     }

//     wss.handleUpgrade(req, socket, head, (ws) => {
//         socket.removeListener('error', (err) => {
//             if (err) console.log(err);
//         });
//         wss.emit("connection", ws, req);
//     })
// });

// wss.on("conneciton",(ws, req) => {
//     ws.on("error", (err) => {
//         console.log(err);
//     });

//     ws.on("message", (msg, isBinary) => {
//         wss.clients.forEach((client) => {
//             if(client.readyState === WebSocket.OPEN) {
//                 client.send(msg, {binary: isBinary});
//             }
//         })
//     });
// });
