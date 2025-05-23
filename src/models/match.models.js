import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    content: {
      type: String,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const MatchSchema = new mongoose.Schema(
  {
    person1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    person2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
