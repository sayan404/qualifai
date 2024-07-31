import { NextResponse } from "next/server";
import {
  getRoleBasedQuestion,
  createRoleBasedQuestion,
} from "@/lib/actions/rolebasedQuesions.action";
// POST request handler to create a new role-based question
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const newQuestion = await createRoleBasedQuestion(body);
    console.log("newQuestion", newQuestion);

    return NextResponse.json(
      {
        message: "New role-based question created",
        question: newQuestion,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// GET request handler to retrieve role-based questions based on filters
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    console.log("url", url);

    const query = Object.fromEntries(url.searchParams.entries());
    console.log("query", query);

    const filteredQuestions = await getRoleBasedQuestion(query);
    console.log("filteredQuestions", filteredQuestions);

    return NextResponse.json(
      {
        message: "Filtered role-based questions",
        questions: filteredQuestions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
