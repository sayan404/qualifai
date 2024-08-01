import OpenAI from "openai";
import { spawn } from "child_process";
import fs from "fs";
import Interview from "@/lib/modals/qna.modal";
import User from "@/lib/modals/user.modal";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export async function fetchSessionData(
  sessionId: string
): Promise<{ session: any; user: any }> {
  const session = await Interview.findOne({ sessionId });
  const clerkId = session.userId;
  const user = await User.findOne({ clerkId });

  console.log("session, user ---->", session, user, clerkId);

  return { session, user };
}

export async function analyzeAnswers(questions: any[]): Promise<any[]> {
  try {
    let results: any[] = [];
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "You are an assistant that grades answers to questions.",
      },
    ];

    questions.forEach((q) => {
      console.log("quesssssssssssssssssssss", q);
      const answers = q.answer;

      if (answers && answers.toLowerCase() !== "failed") {
        results.push({
          question: q.question,
          answer: q.answer,
          score: q.answer.toLowerCase(),
        });
        messages.push({
          role: "user",
          content: `Rate the accuracy of the following answer to the question: "${q.question}" Answer: "${q.answer}" Rate on a scale of 0 to 10.`,
        });
      } else {
        results.push({
          question: q.question,
          answer: q.answer,
          score: q.answer.toLowerCase() === "failed" ? 0 : null,
        });
      }
    });
    console.log("messages", messages);

    if (messages.length > 1) {
      const response = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4",
      });
      console.log("responsessssssss", response);

      response.choices.forEach((choice, index) => {
        console.log("choice", choice, index);
        if (index < results.length) {
          // @ts-ignore
          const score = parseInt(choice.message.content.trim(), 10);
          console.log(score);

          results[index].score = score;
        }
      });
    }
    console.log("results", results);

    return results;
  } catch (error: any) {
    const ansy: any[] = [];
    console.log(error.message);
    return ansy;
  }
}

export function generateReportCard(
  session: any,
  analysisResults: any[],
  callback: () => void
) {
  const script = `
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_report_card(session, analysis_results, filepath):
  c = canvas.Canvas(filepath, pagesize=letter)
  width, height = letter

  c.setFont("Helvetica", 20)
  c.drawString(100, height - 50, "Report Card")

  c.setFont("Helvetica", 12)
  c.drawString(50, height - 100, f"Session ID: {session['sessionId']}")
  c.drawString(50, height - 120, f"User ID: {session['userId']}")

  y = height - 150
  for result in analysis_results:
    c.drawString(50, y, f"Question: {result['question']}")
    c.drawString(50, y - 20, f"Answer: {result['answer']}")
    c.drawString(50, y - 40, f"Score: {result['score']}")
    y -= 70

  c.save()

generate_report_card(${JSON.stringify(session)}, ${JSON.stringify(
    analysisResults
  )}, "report_card.pdf")
  `;
  fs.writeFileSync("generate_report.py", script);

  const process = spawn("python", ["generate_report.py"]);
  process.on("close", callback);
}

export async function saveReportToUser(user: any, filepath: string) {
  const reportData = fs.readFileSync(filepath);
  user.reports.push({
    interviewFor: user.clerkId,
    detailedFeedback: reportData.toString("base64"),
  });
  await user.save();
}
