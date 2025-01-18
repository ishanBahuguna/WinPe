import mongoose from "mongoose";
require("dotenv").config();

export const connectDB = () => {
  mongoose
    .connect(`${process.env.DATABASE_URL}`, {
      dbName: "WinPe",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.error(e));
};
