import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';

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
    role: {
      type: String,
      enum: [ROLES.TEACHER, ROLES.PARENT],
      default: ROLES.PARENT,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

export const User = model('user', userSchema);
