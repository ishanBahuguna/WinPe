import express from 'express';
import { otp , verifyUser , signupUser } from '../controllers/user';
import { singleUpload } from '../middlewares/multer';

const app = express.Router();

// /api/v1/user/otp
app.post("/otp", singleUpload , otp)

// /api/v1/user/verifyUser
app.post("/verifyUser" , verifyUser)

// /api/v1/user/signupVerify
app.post("/signupUser", singleUpload , signupUser)

 
export default app;