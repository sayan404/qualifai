import { Schema, Document, model, models } from "mongoose";

interface Question {
  question: string;
  answer?: string;
}

export interface InterviewDocument extends Document {
  sessionId: string;
  userId: string;
  questions: Question[];
}

const questionSchema = new Schema<Question>({
  question: { type: String },
  answer: { type: String },
});

const interviewSchema = new Schema<InterviewDocument>(
  {
    sessionId: { type: Schema.Types.Mixed }, // No type validation for sessionId
    userId:  { type: Schema.Types.Mixed },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true }
);

const Interview = models?.Interview || model("Interview", interviewSchema);

export default Interview;
