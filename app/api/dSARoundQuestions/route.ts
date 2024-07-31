import { NextResponse } from "next/server";
import { createDSARoundQuestion , getDSARoundQuestions } from "@/lib/actions/dSARoundQuestions.action";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body received for creation", body);

    const newQuestion = await createDSARoundQuestion(body);
    console.log("New DSA Round question created", newQuestion);

    return NextResponse.json(
      {
        message: "New DSA Round question created successfully",
        question: newQuestion,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error occurred while creating DSA Round question", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    console.log("URL received", url);

    const query = Object.fromEntries(url.searchParams.entries());
    console.log("Query parameters received", query);

    const filteredQuestions = await getDSARoundQuestions(query);
    console.log("Filtered DSA Round questions", filteredQuestions);

    return NextResponse.json(
      {
        message: "Filtered DSA Round questions retrieved successfully",
        questions: filteredQuestions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error occurred while retrieving DSA Round questions", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
