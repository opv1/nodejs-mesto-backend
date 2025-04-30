import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      min: 2,
      max: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      min: 2,
      max: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value: string) => validator.isURL(value),
      },
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

export default model<IUser>('user', userSchema);
