import express, {Response, Request} from "express";

import gamesRouter from "./routes/games";
import {openDbConnection} from "./utils/db_connector";


const app = express();

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use("/api/ns-games/", gamesRouter);
app.all("*", (request: Request, response: Response) => response.sendStatus(404).send("Not Found"));

openDbConnection()
    .then(() => app.listen(3005, () => console.log("Server is listening")));
