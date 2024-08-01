import { Schema, model, models } from "mongoose";

const reportSchema = new Schema({
  interviewFor: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
  verbalQuestions: {
    type: Number,
    default: 2,
  },
  codingQuestions: {
    type: Number,
    default: 3,
  },
  detailedFeedback: {
    type: String,
  },
  voiceSentimentAnalysis: {
    type: String,
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
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String
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
