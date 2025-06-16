import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema(
  {
    username: {
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

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  content: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  // If you expect multiple replies, use an array; if only one, remove the array.
  reply: [ReplySchema],
});

const GossipSchema = new mongoose.Schema(
  {
    person1: {
      name: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      ID: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    person2: {
      name: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      ID: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    likes: [
      {
        type: String,
      },
    ],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Gossip || mongoose.model('Gossip', GossipSchema);
