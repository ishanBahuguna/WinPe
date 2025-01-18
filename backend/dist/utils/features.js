"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const connectDB = () => {
    mongoose_1.default
        .connect(`${process.env.DATABASE_URL}`, {
        dbName: "WinPe",
    })
        .then((c) => console.log(`DB connected to ${c.connection.host}`))
        .catch((e) => console.error(e));
};
exports.connectDB = connectDB;
