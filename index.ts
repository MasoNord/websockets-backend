import { httpServer } from "./src/http_server/index";
import dotenv from "dotenv";

import "./src/web_sever/index";

dotenv.config();
const HTTP_PORT = parseInt(process.env.PORT!) || 5000;

httpServer.listen(HTTP_PORT, () => {
    console.log(`Start static http server on the ${HTTP_PORT} port!`);
});






