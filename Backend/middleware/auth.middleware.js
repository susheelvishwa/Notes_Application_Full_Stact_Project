import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

const auth = async (req, res, next) => {
  console.log("auth middleware called");
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token not found" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token hhhhh" });
  }
};

export default auth;
