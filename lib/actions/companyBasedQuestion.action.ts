"use server";

import CompanyBasedQuestion from "@/lib/modals/companybased.modal";
import { connect } from "../db";

export async function createCompanyBasedQuestion(questions: any) {
  try {
    console.log("questions comming in params", questions);
    await connect();
    console.log("db connected");

    const insertionResponse = await CompanyBasedQuestion.create(questions);
    console.log("insertionResponse", insertionResponse);

    JSON.parse(JSON.stringify(insertionResponse));
  } catch (error: any) {
    console.log("error occured while creating user ", error.message);
    return JSON.parse(JSON.stringify({ message: error.message }));
  }
}
export async function getCompanyBasedQuestion(query: any) {
  try {
    await connect();
    console.log("db connected");

    console.log("query comming in params", query);

    const filter: any = {};
    if (query.company) filter.company = query.company;
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.dataStructureType)
      filter["question.dataStructureType"] = query.dataStructureType;
    if (query.question)
      filter["question.question"] = {
        $regex: query.question,
        $options: "i",
      };
    console.log("query", query);

    const questions = await CompanyBasedQuestion.find(filter);
    return JSON.parse(JSON.stringify({ questions }));
  } catch (error: any) {
    console.log(error.message);
    return JSON.parse(JSON.stringify({ message: error.message }));
  }
}
