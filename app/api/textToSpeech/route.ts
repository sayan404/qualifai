// /app/api/textToSpeech/route.js
import { createClient } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "stream/promises";

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  const text = question
  console.log("text", text);

  const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
  const deepgram = createClient(deepgramApiKey);

  try {
    const response = await deepgram.speak.request(
      { text },
      { model: "aura-asteria-en" }
    );

    const stream = await response.getStream();
    if (stream) {
      const headers = new Headers();
      headers.set("Content-Type", "audio/mp3");

      // Create a new NextResponse with the stream and headers
      return new NextResponse(stream, { headers });
    } else {
      return NextResponse.json(
        { error: "Error generating audio" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
