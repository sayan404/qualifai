// Donot use or show this page ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ 
import { Schema, model, models } from "mongoose";

const testCaseSchema = new Schema({
  query: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
});

const exampleSchema = new Schema({
  testCase: {
    type: testCaseSchema,
  },
  explanation: {
    type: String,
  },
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  testCases: [testCaseSchema],
  example: {
    type: exampleSchema,
  },
  dataStructureType: {
    type: String,
    required: true,
  },
});

// Basic Tech Stack Related Question Schema
const techStackQuestionSchema = new Schema({
  question: { type: questionSchema, required: true },
  role: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  example: { type: String },
});

const TechStackQuestion =
  models?.TechStackQuestion ||
  model("TechStackQuestion", techStackQuestionSchema);

export default TechStackQuestion ;
