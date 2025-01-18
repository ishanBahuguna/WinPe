import express from 'express';
import { signup , signupVerify } from '../controllers/user';
import { singleUpload } from '../middlewares/multer';

const app = express.Router();

// route - /api/v1/user/new
app.post("/signup", singleUpload , signup)
app.post("/signup/verify" , singleUpload , signupVerify)

// app.post("/signin" , signin)
 
export default app;