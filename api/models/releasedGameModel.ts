import {model} from "mongoose";
import {gameSchema} from "../schemas/gameSchema";


export const releasedGameModel = model("ns_games", gameSchema);
