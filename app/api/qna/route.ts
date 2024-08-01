import { NextResponse } from "next/server";
import { startInterview } from "@/lib/actions/qna.action";
export async function POST(req: Request) {
  try {
    const { sessionId, userId, question } = await req.json();
    console.log("sessionId, userId, question", sessionId, userId, question);

    const interviewdata = await startInterview(userId, question, sessionId);
    console.log("Interview q added", interviewdata);

    return NextResponse.json(
      {
        message: "Interview q added successfully",
        data: interviewdata,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(
      "Error occurred while creating DSA Round question",
      error.message
    );
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
