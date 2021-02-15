import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

interface IReq extends Request {
  user: any;
}

export default (req: IReq, res: Response, next: NextFunction) => {
  try {
    if (!process.env.SECRET) throw new Error("Environment Invalid");

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("Auth Failed");

    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
};
