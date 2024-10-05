import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    avatarUrl: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model('user', userSchema);