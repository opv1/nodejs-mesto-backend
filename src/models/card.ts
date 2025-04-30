import { Document, Schema, model } from 'mongoose';

interface ICard extends Document {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: string;
}

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true },
);

export default model<ICard>('card', cardSchema);
