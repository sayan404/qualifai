"use server";
import mongoose from "mongoose";
import Interview from "../modals/qna.modal";
import { NextResponse } from "next/server";
import { connect } from "../db";

export async function startInterview(
  userId: string, 
  questions: { question: string; answer: string },
  sessionId?: string
) {
  console.log("userId,questions,sessionId", userId, questions, sessionId);

  await connect();
  try {
    console.log("sessionId", sessionId);

    if (sessionId) {
      let interview = await Interview.findOne({ sessionId });
      console.log("Interview found with sessionId:", interview);

      if (interview) {
        // If a session exists, update it with new questions
        interview.questions.push(questions);
        interview = await interview.save();
        console.log("Interview updated successfully:", interview);
        return JSON.parse(JSON.stringify(interview));
      } else {
        console.log("No interview found with the given sessionId");
      }
    }

    // If no session exists or interview not found, create a new one
    const newSessionId = new mongoose.Types.ObjectId().toString(); // Generate a unique session ID
    console.log("newSessionId", newSessionId);
    const interview = new Interview({
      sessionId: newSessionId,
      userId,
      questions,
    });

    await interview.save();
    console.log("New interview created successfully:", interview);
    return JSON.parse(JSON.stringify(interview));
  } catch (error) {
    console.error("Error starting interview:", error);
  }
}
