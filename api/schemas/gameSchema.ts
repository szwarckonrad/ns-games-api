import {Schema} from "mongoose";


export interface IReleasedGame {
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

export const gameSchema = new Schema<IReleasedGame>({
    gametitle: String,
    release: String,
    usadate: String,
    jpndate: String,
    eurdate: String,
    ausdate: String,
    usacart: String,
    jpncart: String,
    eurcart: String,
    auscart: String,
    english: String,
    notes: String
});

