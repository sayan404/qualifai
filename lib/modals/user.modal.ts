import { Schema, model, models } from "mongoose";

const reportSchema = new Schema({
  interviewFor: {
    type: String,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  verbalQuestions: {
    type: Number,
    default: 0,
  },
  codingQuestions: {
    type: Number,
    default: 0,
  },
  detailedFeedback: {
    type: String,
    default: false,
  },
  voiceSentimentAnalysis: {
    type: String,
    default: false,
  },
});

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  reports: {
    type: [reportSchema],
    default: [],
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
