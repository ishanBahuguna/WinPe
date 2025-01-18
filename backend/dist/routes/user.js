"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const multer_1 = require("../middlewares/multer");
const app = express_1.default.Router();
// route - /api/v1/user/new
app.post("/signup", multer_1.singleUpload, user_1.signup);
app.post("/signup/verify", multer_1.singleUpload, user_1.signupVerify);
// app.post("/signin" , signin)
exports.default = app;
