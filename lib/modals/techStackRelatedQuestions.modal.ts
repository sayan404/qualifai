import { Schema, model, models } from "mongoose";

// Basic Tech Stack Related Question Schema
const techStackQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  techStack: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  answer: {
    type: String,
    required: false,
  },
});

const TechStackQuestion =
  models?.TechStackQuestion ||
  model("TechStackQuestion", techStackQuestionSchema);

export { TechStackQuestion };
