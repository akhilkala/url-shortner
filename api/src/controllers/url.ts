import Url from "../models/Url";

type AddUrlInput = {
  name: string;
  long: string;
  userID: string;
  short?: string;
};

export const getAllUrls = async () => {
  const urls = await Url.find({});
  return urls;
};

export const getUrlByID = async (_: undefined, { id }: { id: string }) => {
  const url = await Url.find({ short: id });
  return url;
};

export const addURL = async (
  _: undefined,
  { name, long, userID, short }: AddUrlInput
) => {
  let url;
  if (short) {
    url = await new Url({ name, long, user: userID, short }).save();
  } else {
    url = await new Url({ name, long, user: userID }).save();
  }

  if (!process.env.DOMAIN_NAME) throw new Error("Environment Invalid");

  if (long.includes(process.env.DOMAIN_NAME)) return null;

  //SET IN REDIS HERE

  return url;
};

export const deleteURL = async (_: undefined, { id }: { id: string }) => {
  const url = await Url.findOneAndDelete({ short: id });
  return url;
};
