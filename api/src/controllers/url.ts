import Url from "../models/Url";
import redisClient from "../config/redis";

type AddUrlInput = {
  name: string;
  long: string;
  userID: string;
};

export const getAllUrls = async () => {
  const urls = await Url.find({});
  return urls;
};

export const getUrlByID = async (_: undefined, { id }: { id: string }) => {
  const url = await Url.findById(id);
  return url;
};

export const addURL = async (
  _: undefined,
  { name, long, userID }: AddUrlInput
) => {
  const url = await new Url({ name, long, user: userID }).save();
  redisClient.set(url.short, long, (err, data) => {
    if (err) throw err;
  });
  return url;
};

export const deleteURL = async (_: undefined, { id }: { id: string }) => {
  const url = await Url.findByIdAndDelete(id);
  return url;
};
