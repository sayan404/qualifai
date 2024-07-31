import { Schema, model, models } from "mongoose";

const testCaseSchema = new Schema({
  query: {
    type: String,
  },
  correctAnswer: {
    type: String,
  }
});

const exampleSchema = new Schema({
  testCase: {
    type: testCaseSchema,
  },
  explanation: {
    type: String,
  }
});

const dsaRoundSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  testCases: [testCaseSchema],
  example: {
    type: exampleSchema,
  },
  company: {
    type: String,
  },
  dataStructureType: {
    type: String,
    enum: ['array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash table', 'heap', 'other'],
    required: true
  }
});

module.exports = models?.DSARound || model('DSARound', dsaRoundSchema);
