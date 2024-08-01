import { createCompanyBasedQuestion, getCompanyBasedQuestion } from "@/lib/actions/companyBasedQuestion.action";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const newQuestion = await createCompanyBasedQuestion(body);
    console.log("newQuestion", newQuestion);

    return NextResponse.json(
      {
        message: "New user created",
        user: newQuestion,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    // console.log("url", url);

    const query = Object.fromEntries(url.searchParams.entries());
    console.log("query", query);

    const filteredQuesions = await getCompanyBasedQuestion(query);
    // console.log("filteredQuesions", filteredQuesions);

    return NextResponse.json(
      {
        message: "filtered Data",
        questions: filteredQuesions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
