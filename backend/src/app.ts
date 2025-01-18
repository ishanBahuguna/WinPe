import express from "express";

// importing routes:
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

const port = 4000;

connectDB();

const app = express()

// middleware which is used before every route
app.use(express.json())

app.get("/" , (req,res) => {
    res.send("Api working fine")
})

app.use("/api/v1/user" , userRoute)

// middleware which should be used at last to handle errors: error handler
app.use(errorMiddleware);


app.listen(port , () => {
    console.log(`Server is running on http://localhost${port}`);
}); 