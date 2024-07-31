"use server";

import DSARound from "@/lib/modals/dsaround.modal";
import { connect } from "../db";

// Function to create a new DSA Round question
export async function createDSARoundQuestion(question: any) {
  try {
    console.log("Question data coming in params", question);
    await connect();
    console.log("Database connected");

    const insertionResponse = await DSARound.create(question);
    console.log("Insertion response", insertionResponse);

    return JSON.parse(JSON.stringify(insertionResponse));
  } catch (error: any) {
    console.log("Error occurred while creating DSA Round question", error.message);
    return JSON.parse(JSON.stringify({ message: error.message }));
  }
}

// Function to get filtered DSA Round questions based on query parameters
export async function getDSARoundQuestions(query: any) {
  try {
    await connect();
    console.log("Database connected");

    console.log("Query parameters coming in", query);

    const filter: any = {};
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.dataStructureType)
      filter.dataStructureType = query.dataStructureType;
    if (query.question)
      filter.question = {
        $regex: query.question,
        $options: "i",
      };
    if (query.company)
      filter.company = query.company;

    console.log("Filter query", filter);

    const questions = await DSARound.find(filter);
    return JSON.parse(JSON.stringify({ questions }));
  } catch (error: any) {
    console.log("Error occurred while retrieving DSA Round questions", error.message);
    return JSON.parse(JSON.stringify({ message: error.message }));
  }
}
