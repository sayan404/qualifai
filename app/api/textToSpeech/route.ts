import { Deepgram } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
export async function POST(req: NextRequest) {
  const { question } = await req.json();
  const text = question;
  console.log("text", text);

  const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
  console.log("deepgramApiKey", deepgramApiKey);

  // Check if the API key is present
  if (!deepgramApiKey) {
    return NextResponse.json(
      { error: "Deepgram API key is missing" },
      { status: 500 }
    );
  }

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
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
