import GoogleSpreadsheet from "google-spreadsheet";
import {map, reduce, isEqual, find, pick} from "lodash";
import {Document} from "mongoose";

import {closeDbConnection, openDbConnection} from "../api/utils/db_connector";
import {releasedGameModel} from "../api/models/releasedGameModel";


interface IGoogleSpreadsheetResponseGame extends IReleasedGame {
    _xml: string;
    id: string;
    _links: {self: string}[];
    save: () => void;
    del: () => void;
}

interface IDocumentReleasedGame extends Document, IReleasedGame {}

interface IReleasedGame {
    gametitle: string;
    release: string;
    usadate: string;
    jpndate: string;
    eurdate: string;
    ausdate: string;
    usacart: string;
    jpncart: string;
    eurcart: string;
    auscart: string;
    english: string;
    notes: string;
}

type IGoogleSpreadsheetResponse = IGoogleSpreadsheetResponseGame[];

openDbConnection();

const doc = new GoogleSpreadsheet("1FNyvbbU64Pb9lheg28gC_5fMalIYJ0aD763T7M1QqF0");

(() => {
    doc.getInfo((err: any, info: any) => {
        const sheet = info.worksheets[0];
        sheet.getRows(
            {
                offset: 4
            },
            async (error: any, rows: IGoogleSpreadsheetResponse) => {
                const storedGames = await releasedGameModel.find();

                const parsedRows = map(rows, row => {
                    const {
                        gametitle, release, usadate, jpndate, eurdate,
                        ausdate, usacart, jpncart, eurcart, auscart,
                        english, notes
                    } = row;

                    return {
                        gametitle, release, usadate, jpndate, eurdate,
                        ausdate, usacart, jpncart, eurcart, auscart, english, notes
                    };
                });

                const newGames = reduce(parsedRows, (acc: IReleasedGame[], game) => {
                    const foundGame = find(storedGames as IDocumentReleasedGame[], storedGame => storedGame.gametitle === game.gametitle);
                    if (!foundGame) {
                        return [...acc, game];
                    }
                    return acc;
                }, []);

                const updatedGames = reduce(parsedRows, (acc: IReleasedGame[], game) => {
                    const foundGame = find(storedGames as IDocumentReleasedGame[], storedGame => {
                        const strippedGameDocument = pick(storedGame, ["gametitle", "release", "usadate", "jpndate", "eurdate", "ausdate", "usacart", "jpncart", "eurcart", "auscart", "english", "notes"]);
                        return isEqual(game, strippedGameDocument);
                    });

                    if (!foundGame) {
                        return [...acc, game];
                    }

                    return acc;
                }, []);

                if (newGames.length) {
                    await releasedGameModel.insertMany(parsedRows)
                        .then(() => console.log("Documents saved"))
                        .catch(reason => console.error(reason));
                } else {
                    console.log("No new games");
                }

                if (updatedGames.length) {
                    await Promise.all(map(updatedGames, async (game) =>
                        await releasedGameModel.replaceOne({gametitle: game.gametitle}, game)
                            .then(() => console.log(`Game ${game.gametitle} updated`))
                            .catch((replaceOneError) => console.error(replaceOneError))
                    ));
                } else {
                    console.log("No updated games found");
                }

                closeDbConnection(() => console.log("connection closed"));

            });
    });
})();
