import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connection from "./config/db.js";
import cors from "cors";
import userRouter from "./route/user.route.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use("/user", userRouter);
app.use(cors({
  origin :'*'
}))

app.get("/", (req, res) => {
  res.send("server is running fine")
})

app.listen(PORT, async() => {
  try {
    await connection
    console.log(`server is running on ${PORT} and db is also connected`);
  } catch (error) {
    console.log("error in the server", error);
  }
})