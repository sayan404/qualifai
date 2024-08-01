import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import {
  fetchSessionData,
  analyzeAnswers,
  generateReportCard,
  saveReportToUser,
} from "@/lib/actions/genReport.action";
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    await connect();

    const { session, user } = await fetchSessionData(sessionId);
    if (!session || !user) {
      return NextResponse.json(
        { message: "Session or user not found" },
        { status: 404 }
      );
    }
    console.log("session , user", session, user);

    const analysisResults = await analyzeAnswers(session.questions);
    console.log('Analysis Results:', analysisResults);

    await generateReportCard(session, analysisResults, async () => {
      await saveReportToUser(user, 'report_card.pdf');
      console.log('Report card generated and saved successfully.');
    });

    // return NextResponse.json({ message: 'Report card generated and saved successfully.', analysisResults });
    return NextResponse.json({ message: 'Report card generated and saved successfully.', session , user });
  } catch (error: any) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

