import Url from "../models/Url";
import { Request, Response } from "express";

export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find({});
    res.status(200).json({
      error: false,
      urls,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      urls: null,
      message: err.message,
    });
  }
};

export const getUrlByID = async (req: Request, res: Response) => {
  try {
    const url = await Url.find({ short: req.body.id });
    res.status(200).json({
      error: false,
      url,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      url: null,
      message: err.message,
    });
  }
};

export const addURL = async (req: Request, res: Response) => {
  try {
    const { name, long, user: userID, short } = req.body;

    let url;
    if (short) {
      url = await new Url({ name, long, user: userID, short }).save();
    } else {
      url = await new Url({ name, long, user: userID }).save();
    }

    if (!process.env.DOMAIN_NAME) throw new Error("Environment Invalid");

    if (long.includes(process.env.DOMAIN_NAME))
      return res.status(400).json({
        error: true,
        url: null,
        message: "Invalid Url",
      });

    //SET IN REDIS HERE

    res.status(200).json({
      error: false,
      url,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      url: null,
      message: err.message,
    });
  }
};

export const deleteURL = async (req: Request, res: Response) => {
  try {
    const url = await Url.findOneAndDelete({ short: req.body.id });

    res.status(200).json({
      error: false,
      url,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      url: null,
      message: err.message,
    });
  }
};
