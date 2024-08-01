import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createClient, webvtt } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });
  const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
  const deepgram = createClient(deepgramApiKey);
  const formData = await req.formData();
  const audioFile = formData.get("audio") as Blob;
  const fileName = `${Date.now()}-audio-file.mp3`;

  console.log("audioFile ", audioFile);
  const arrayBuffer = await audioFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    new Upload({
      client: s3,
      params: {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
      },
    }).done();
    console.log("File uploaded successfully.");
  } catch (err: any) {
    console.error("Error uploading file:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }

  const audioUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
  // console.log("audioUrl", audioUrl);

  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: audioUrl,
      },
      { model: "nova-2", language: "en", smart_format: true }
    );
    // return NextResponse.json({ result }, { status: 200 });
    console.log(
      "result s2t",
      result?.results.channels[0].alternatives[0].transcript,
      result?.results.channels[0].alternatives,
      result?.results.summary,
      result?.results.sentiments
    );
    const resultData = result?.results.channels[0].alternatives[0].transcript;

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error: any) {
    console.error("Error in streamToText API route:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
