import { NextResponse } from "next/server";
import {
  getVerbalQuestion,
  createVerbalQuestion,
} from "@/lib/actions/verbalQuestions.action";
// POST request handler to create a new verbal-based question
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const newQuestion = await createVerbalQuestion(body);
    console.log("newQuestion", newQuestion);

    return NextResponse.json(
      {
        message: "New verbal-based question created",
        question: newQuestion,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// GET request handler to retrieve verbal-based questions based on filters
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const filteredQuestions = await getVerbalQuestion(query);
    return NextResponse.json(
      {
        message: "Filtered verbal-based questions",
        questions: filteredQuestions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
