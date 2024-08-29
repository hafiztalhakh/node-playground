const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    auth: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
