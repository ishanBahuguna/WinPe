"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        default: () => {
            return generateRandomName();
        },
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: [true, "Please enter your gender"],
    },
    dob: {
        type: Date,
        required: [true, "Please enter date of birth"],
    },
}, {
    timestamps: true,
});
// function to create random name if user doesn't enter any name:
function generateRandomName() {
    const adjectives = ["Cool", "Brave", "Smart", "Clever", "Kind"];
    const nouns = ["Tiger", "Eagle", "Bear", "Wolf", "Fox"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 1000)}`;
}
// virtural attribute 'age' derived from date of birth:
UserSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()))
        age--;
    return age;
});
exports.User = mongoose_1.default.model("User", UserSchema);
