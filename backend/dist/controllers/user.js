"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupVerify = exports.signup = void 0;
const zodAuth_1 = require("../utils/zodAuth");
const user_1 = require("../models/user");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const twilio_1 = __importDefault(require("twilio"));
require("dotenv").config();
const client = (0, twilio_1.default)(process.env.twilioAccountSid, process.env.twilioAuthToken);
let OTP = "";
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res, next) => {
    try {
        const { success } = zodAuth_1.NewUserRequestBodyValidator.safeParse(req.body);
        if (!success)
            next(new utility_class_1.default("Please check input data!", 404));
        const { userName, phoneNumber, gender, dob } = req.body;
        let user = await user_1.User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exsist",
            });
        }
        let digits = "0123456789";
        OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        await client.messages
            .create({
            body: `Your OTP for WinPe verification is ${OTP}`,
            // messagingServiceSid: `${process.env.messagingServiceid}`,
            to: `+91${phoneNumber}`,
            from: "+15075127141"
        })
            .then(() => {
            console.log(OTP);
            return res.status(200).json({
                success: true,
                message: "OTP sent successfully"
            });
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
exports.signup = signup;
const signupVerify = async (req, res, next) => {
    try {
        const { userName, phoneNumber, gender, dob, otp } = req.body;
        const photo = req.file;
        if (otp != OTP) {
            return next(new utility_class_1.default("Incorrect OTP", 404));
        }
        const user = await user_1.User.create({
            userName,
            phoneNumber,
            gender,
            dob: new Date(dob),
            photo: photo?.path,
        });
        // JWT token generation for authentication
        const id = user._id;
        const token = jsonwebtoken_1.default.sign({
            id
        }, JWT_SECRET);
        OTP = "";
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.userName}`,
            token: token
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
exports.signupVerify = signupVerify;
