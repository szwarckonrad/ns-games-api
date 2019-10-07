import {model, Document} from "mongoose";
import {gameSchema, IReleasedGame} from "../schemas/gameSchema";


interface IReleaseGameModel extends Document, IReleasedGame {}

export const releasedGameModel = model<IReleaseGameModel>("ns_games", gameSchema);
