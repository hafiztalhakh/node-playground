const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Auth', authSchema);
