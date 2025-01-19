import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = () => {
  mongoose
    .connect(`${process.env.DATABASE_URL}`, {
      dbName: "WinPe",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.error(e));
};




export function generateRandomName() {
    const adjectives = ["Cool", "Brave", "Smart", "Clever", "Kind"];
    const nouns = ["Tiger", "Eagle", "Bear", "Wolf", "Fox"];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
    return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 1000)}`;
}