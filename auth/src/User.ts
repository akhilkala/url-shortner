import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  password: string;
  email: string;
  username: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
});

export default mongoose.model<IUser>("User", userSchema);
