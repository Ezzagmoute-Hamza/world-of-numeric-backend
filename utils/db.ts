import mongoose from "mongoose";
import { checkNullable } from "../utils";

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(checkNullable(process.env.MONGO_DB_URI, ""), {})
        .then(() => {
            console.log('Mongodb Connection Successfully');
        })
        .catch(err => {
            console.log('error', err);
        });
};