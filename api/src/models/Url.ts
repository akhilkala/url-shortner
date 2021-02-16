import mongoose, { Document } from "mongoose";
import shortid from "shortid";

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#_"
);

interface IUrl extends Document {
  name: string;
  long: string;
  short: string;
  mobileVisits: number;
  desktopVisits: number;
  user: mongoose.Schema.Types.ObjectId;
}

const urlSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
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
});

export default mongoose.model<IUrl>("Url", urlSchema);
