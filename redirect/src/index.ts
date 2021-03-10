import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import redisClient from "./redis";

const app: Application = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/set", (req: Request, res: Response) => {
  const { short, long } = req.body;
  redisClient.set(short, long, (err, data) => {
    if (err) throw err;
  });
});

app.use("/:short", (req: Request, res: Response) => {
  redisClient.get(req.params.short, (err, long) => {
    if (err || !long) throw err;
    res.redirect(long);
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    user: null,
    error: true,
  });
});

app.listen(7000, () => console.log(`Server running on port 7000...`));

//STUDY ECE
