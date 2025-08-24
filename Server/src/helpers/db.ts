import mongoose from "mongoose";

const dburl = process.env.MONGO_URL as string;

export default async function connectdb() {
    mongoose.connect(`${dburl}/grocergo`)
        .then(() => console.log("database is connected"))
        .catch(err => console.log(err));
}