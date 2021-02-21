import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import connectDB from "./db";
import User from "./User";

const app: Application = express();
dotenv.config();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "User does not exist",
        user: null,
        error: true,
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(401).json({
        message: "Auth Failed",
        user: null,
        error: true,
      });
    }

    if (!process.env.SECRET) throw new Error("Internal Server Error");

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET
    );

    res.status(200).send({
      token,
      error: null,
      message: "Log In Successful",
    });
  } catch (err) {
    next(err);
  }
});

app.use(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) throw new Error("Invalid Request");

      const exisitngUser = await User.findOne({ email });

      if (exisitngUser) {
        return res.json({
          message: "User already Exists",
          user: null,
          error: true,
        });
      }

      const hashedPass = await bcrypt.hash(password, 10);

      let user = new User({
        username,
        email,
        password: hashedPass,
      });

      user = await user.save();

      res.status(200).json({
        message: "User created Successfully",
        error: null,
        user: { ...user, password: null },
      });
    } catch (err) {
      next(err);
    }
  }
);

app.use("/", (req: Request, res: Response) => {
  try {
    if (!process.env.SECRET) throw new Error("Internal Server Error");

    const token = req.body.token;

    if (!token) throw new Error("Auth Failed");

    const user = jwt.verify(token, process.env.SECRET);

    res.status(200).json({
      error: null,
      user,
      message: "User Verified",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
      user: null,
      error: true,
    });
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    user: null,
    error: true,
  });
});

app.listen(6000, () => console.log(`Server running on port 6000...`));

//STUDY ECE
