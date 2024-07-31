import { Schema, model, models } from "mongoose";

// Verbal Question Schema
const verbalQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
});

const VerbalQuestion =
  models?.VerbalQuestion || model("VerbalQuestion", verbalQuestionSchema);

export { VerbalQuestion };
