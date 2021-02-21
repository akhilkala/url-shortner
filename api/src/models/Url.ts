import mongoose, { Document } from "mongoose";
import shortid from "shortid";

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#_"
);

interface IUrl extends Document {
  short: string;
  name: string;
  long: string;
  mobileVisits: number;
  desktopVisits: number;
  user: mongoose.Schema.Types.ObjectId;
}

const urlSchema = new mongoose.Schema(
  {
    short: {
      type: String,
      default: shortid.generate,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    mobileVisits: {
      type: Number,
      default: 0,
    },
    desktopVisits: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { _id: false }
);

export default mongoose.model<IUrl>("Url", urlSchema);
