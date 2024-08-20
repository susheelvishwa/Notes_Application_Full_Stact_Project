import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/user.model";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender, age } = req.body;
  try {
    const hash = await bcrypt.hash(password, 5);
    const user = new UserModel({
      name,
      email,
      password: hash,
      gender,
      age,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
