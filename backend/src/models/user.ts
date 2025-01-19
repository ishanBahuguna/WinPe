import mongoose from "mongoose";

interface IUser extends Document {
    userName: string;
    phoneNumber: number;
    // photo?: string;
    // gender: "male" | "female" | "others";
    // dob: Date;
    createdAT:Date;
    updatedAt:Date;
    // age: number; // virtual attribute
}

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim:true,
      required:[true , "Please enter user's name"]
    },

    phoneNumber : {
        type: String,
        required: [true , "Please enter user's phone number"]
    },

    // photo: {
    //   type: String,
    // },

    // gender: {
    //   type: String,
    //   enum: ["male", "female", "others"],
    //   required: [true, "Please enter user's gender"],
    // },

    // dob: {
    //   type: Date,
    //   required: [true, "Please enter user's date of birth"],
    // },
  },

  {
    timestamps: true,
  }
);


// virtural attribute 'age' derived from date of birth:
// UserSchema.virtual("age").get(function () {
//   const today = new Date();
//   const dob = this.dob;
//   let age = today.getFullYear() - dob.getFullYear();

//   if (
//     today.getMonth() < dob.getMonth() ||
//     (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
//   )
//     age--;

//   return age;
// });

export const User = mongoose.model<IUser>("User", UserSchema);
