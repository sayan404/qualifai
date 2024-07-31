"use server";
import { VerbalQuestion } from "../modals/verbalQuestions.modal";
import { connect } from "../db";

// Function to create a new verbal-based question
export async function createRoleBasedQuestion(questionData: any) {
  try {
    console.log("questionData coming in params", questionData);
    await connect();
    console.log("db connected");

    const insertionResponse = await VerbalQuestion.create(questionData);
    console.log("insertionResponse", insertionResponse);

    return JSON.parse(JSON.stringify(insertionResponse));
  } catch (error: any) {
    console.log("error occurred while creating verbal question", error.message);
    return JSON.parse(JSON.stringify({ message: error.message }));
  }
}

// Function to get role-based questions with filtering
export async function getRoleBasedQuestion(query: any) {
  try {
    await connect();
    console.log("db connected");

    console.log("query coming in params", query);

    const filter: any = {};
    if (query.role) filter.role = query.role;
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.question)
      filter["question"] = {
        $regex: query.question,
        $options: "i",
      };

    console.log("filter", filter);

    const questions = await VerbalQuestion.find(filter);
    return JSON.parse(JSON.stringify({ questions }));
  } catch (error: any) {
    console.log(error.message);
    return JSON.parse(JSON.stringify({ message: error.message }));
  }
}
