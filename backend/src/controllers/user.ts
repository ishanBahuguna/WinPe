import { NextFunction, Request, Response } from "express";
import { NewUserRequestBodyValidator } from "../utils/zodAuth";
import { User } from "../models/user";
import { NewUserRequestBody } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import jwt from "jsonwebtoken";
import twilio from "twilio";

require("dotenv").config();

const client = twilio(process.env.twilioAccountSid , process.env.twilioAuthToken);
let OTP = ""
const JWT_SECRET:any = process.env.JWT_SECRET;

export const signup = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { success } = NewUserRequestBodyValidator.safeParse(req.body);

    if (!success) next(new ErrorHandler("Please check input data!", 404));

    const { userName, phoneNumber, gender, dob } = req.body;

    let user = await User.findOne({ phoneNumber });
 
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exsist",
      });
    }

    let digits = "0123456789"
    OTP = "";

    for(let i = 0;i < 4;i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    await client.messages
    .create({
        body:`Your OTP for WinPe verification is ${OTP}`,
        // messagingServiceSid: `${process.env.messagingServiceid}`,
        to:`+91${phoneNumber}`,
        from:"+15075127141"
    })
    .then(() => {
        console.log(OTP)
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })
    })

  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};






export const signupVerify = async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
  
      const { userName, phoneNumber, gender, dob , otp } = req.body;
  
      const photo = req.file;

      if(otp != OTP) {
        return next(new ErrorHandler("Incorrect OTP" , 404));
      }

      const user = await User.create({
        userName,
        phoneNumber,
        gender,
        dob: new Date(dob),
        photo: photo?.path,
      });

      
      // JWT token generation for authentication
      const id = user._id;
      const token = jwt.sign({
          id
      }, JWT_SECRET)
  
      OTP = ""
      
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.userName}`,
        token: token
      });
    } catch (err: any) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  };
  



