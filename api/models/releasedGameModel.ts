import {model} from "mongoose";
import {gameSchema} from "../schemas/gameSchema";


export const releasedGame = model("ns_games", gameSchema);
