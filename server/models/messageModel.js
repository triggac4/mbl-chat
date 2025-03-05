import mongoose from "mongoose";
import User from "./userModel.js";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
    },
    forAll: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-populate user details on queries
messageSchema.pre(/^find/, function (next) {
  this.populate("sender");
  next();
});
const Message = mongoose.model("Message", messageSchema);

export default Message;
