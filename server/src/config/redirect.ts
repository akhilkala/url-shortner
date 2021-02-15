import { Request, Response } from "express";
import Url from "../models/Url";
import redisClient from "./redis";

export default (req: Request, res: Response) => {
  redisClient.get(req.params.id, (err, long) => {
    if (err || !long) throw err;
    res.redirect(long);
  });
};
