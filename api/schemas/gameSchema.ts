import {Schema} from "mongoose";


export const gameSchema = new Schema({
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

