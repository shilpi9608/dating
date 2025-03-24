import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    personalInformation: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      age: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
      },
      smoking: {
        type: String,
        enum: ['yes', 'occasionally', 'no'],
      },
      drinking: {
        type: String,
        enum: ['yes', 'occasionally', 'no'],
      },
      religion: {
        type: String,
        enum: ['Hindu', 'Christian', 'Sikh', 'Jain', 'Others'],
      },
    },
    gossipUserName: {
      type: String,
      unique: true,
      trim: true,
    },
    about: {
      type: String,
    },
    collegeInformation: {
      year: {
        type: Number,
      },
      branch: {
        type: String,
        trim: true,
      },
    },
    interests: {
      type: [String],
    },
    photos: {
      type: [String],
    },
    preferences: {
      matchType: {
        type: String,
        trim: true,
      },
      matchGender: {
        type: String,
        trim: true,
      },
      qualities: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
