import { createClient, webvtt } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
  const deepgram = createClient(deepgramApiKey);
  const formData = await req.formData();
  const audioFile = formData.get("audio") as Blob;
  const audioUrl = URL.createObjectURL(audioFile);
  try {
    const result = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: audioUrl,
      },
      { model: "nova-2", language: "en", smart_format: true }
    );
    console.log("result s2t", result);

    const captions = webvtt(result);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    console.error("Error in streamToText API route:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
