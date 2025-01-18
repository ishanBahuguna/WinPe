import { doesNotMatch } from "assert";
import mongoose from "mongoose";

interface IUser extends Document {
    userName: string;
    phoneNumber: number;
    photo?: string;
    gender: "male" | "female" | "others";
    dob: Date;
    createdAT:Date;
    updatedAt:Date;
    age: number; // virtual attribute
}

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: () => {
        return generateRandomName();
      },
      trim:true
    },

    phoneNumber : {
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
  },

  {
    timestamps: true,
  }
);

// function to create random name if user doesn't enter any name:
function generateRandomName() {
  const adjectives = ["Cool", "Brave", "Smart", "Clever", "Kind"];
  const nouns = ["Tiger", "Eagle", "Bear", "Wolf", "Fox"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 1000)}`;
}

// virtural attribute 'age' derived from date of birth:
UserSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  )
    age--;

  return age;
});

export const User = mongoose.model<IUser>("User", UserSchema);
