import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";

export const errorMiddleware = async (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    // err.message exsist otherwise ""
    err.message ||= "Error Occured";
    err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};


// wrapper function for try-catch block:
export const TryCatch = () => () => {
    
}

