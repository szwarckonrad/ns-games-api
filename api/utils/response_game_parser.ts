import {map, orderBy} from "lodash";
import moment from "moment";

import {IReleasedGame} from "../schemas/gameSchema";


export const responseGameParser = (games: IReleasedGame[]) => {
    return orderBy(map(games, game => {
        return {
            ...game,
            release: parseInt(game.release, 10),
            usadate: parseReleaseDate(game.usadate),
            jpndate: parseReleaseDate(game.jpndate),
            eurdate: parseReleaseDate(game.eurdate),
            ausdate: parseReleaseDate(game.ausdate),
            usacart: parseReleaseCartSerial(game.usacart),
            jpncart: parseReleaseCartSerial(game.jpncart),
            eurcart: parseReleaseCartSerial(game.eurcart),
            auscart: parseReleaseCartSerial(game.auscart),
            english: game.english === "Yes"
        };
    }), "release", "desc");
};

const parseReleaseDate = (date: string) => {
    if (moment(date, "YYYY/MM/DD", true).isValid()) {
        return date;
    }
    return null;
};

const parseReleaseCartSerial = (serial: string) => {
    if (serial.match(/^L[A-B]-H-[\w]{5}-[A-Z]{3}$/)) {
        return serial;
    }
    return null;
};
