import mongoose from "mongoose";

import {mongoENV} from "./env_parser";


const {mongoURL, mongoDB, mongoUSER, mongoPASSWORD} = mongoENV;
if (!mongoURL || !mongoDB || !mongoUSER || !mongoPASSWORD) {
    throw new Error("Missing mongo url/db env");
}

export const openDbConnection = () =>
    mongoose.connect(mongoURL + mongoDB, {useNewUrlParser: true, auth: {user: mongoUSER, password: mongoPASSWORD}, useUnifiedTopology: true})
        .then(() => {
            console.log("Database connection successful");
        })
        .catch(err => {
            console.error("Database connection error: ", err);
        });

