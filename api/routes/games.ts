import express, {Request, Response} from "express";

import {releasedGameModel} from "../models/releasedGameModel";


const gamesRouter = express.Router();

gamesRouter
    .get("/game", async (req, res) => {
        try {
            const result = await releasedGameModel.find({}, "-_id -__v").exec();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .options("/game", (req, res) => {
        res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.send(200);
    })
    .all("/game", (req: Request, res: Response) => {
        res.sendStatus(400).json({error: `Method ${req.method} not supported`});
    });

export default gamesRouter;
