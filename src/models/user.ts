import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    about: {
      type: String,
      required: true,
      min: 2,
      max: 200,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export default model<IUser>('user', userSchema);
