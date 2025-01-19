import { NextFunction, Request, Response } from "express";
import { NewUserRequestBodyValidator } from "../utils/zodAuth";
import { User } from "../models/user";
import { NewUserRequestBody } from "../types/types";
import ErrorHandler from "../utils/utility-class";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";
import { generateRandomName } from "../utils/features";

dotenv.config();




const client = twilio(process.env.twilioAccountSid , process.env.twilioAuthToken);
let OTP = ""
const JWT_SECRET:any = process.env.JWT_SECRET;

export const otp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { phoneNumber } = req.body;

    if(!phoneNumber) {
        return next(new ErrorHandler("Please enter a valid phone number" , 404));
    }


    let digits = "0123456789"
    OTP = "";

    for(let i = 0;i < 6;i++) {
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
        console.log(`OTP sent successfully : ${OTP}`)
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


export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { otp } = req.body;

        if(otp != OTP) {
            return next(new ErrorHandler("Incorrect OTP!" , 404));
        }

        OTP = "";
        const { phoneNumber } = req.body;
        let user = await User.findOne({phoneNumber})

        // if user already exist login otherwise go to signup route for details of user
        if (user) {
            const id = user._id;
            
            const token = jwt.sign({
                id
            },JWT_SECRET);
    
          return res.status(200).json({
            success: true,
            message: `Welcome, ${user.userName}`,
            token : token
          });
        }
    


      const userName = generateRandomName();

        user = await User.create({
        userName,
        phoneNumber,
      });

      
      // JWT token generation for authentication
      const id = user._id;
      const token = jwt.sign({
          id
      }, JWT_SECRET);
  
      
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.userName}`,
        token: token
    })
    } catch(err : any) {
        res.status(404).json({
            success:false,
            message:err
        })
    }
}







// export const signupUser = async (
//     req: Request<{} , {} , NewUserRequestBody>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
        
//     const { success } = NewUserRequestBodyValidator.safeParse(req.body);

//     if (!success) next(new ErrorHandler("Input data is incorrect!", 404));


//       const { phoneNumber, gender, dob } = req.body;
  
//       const photo = req.file;

//       const userName = generateRandomName();

//       const user = await User.create({
//         userName,
//         phoneNumber,
//         gender,
//         dob: new Date(dob),
//         photo: photo?.path,
//       });

      
//       // JWT token generation for authentication
//       const id = user._id;
//       const token = jwt.sign({
//           id
//       }, JWT_SECRET);
  
      
//       return res.status(200).json({
//         success: true,
//         message: `Welcome, ${user.userName}`,
//         token: token
//       });
//     } catch (err: any) {
//       return res.status(404).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };









  



