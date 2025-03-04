import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    participantEmails: [
      {
        type: String,
        required: true,
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Create unique compound index to prevent duplicate rooms with same participants
roomSchema.index(
  { participantEmails: 1 },
  { 
    unique: true,
    partialFilterExpression: { isGroupChat: false } 
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;