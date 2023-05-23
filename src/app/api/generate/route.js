import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

if (!configuration.apiKey) {
  throw new Error("API_KEY is not defined");
}

const openai = new OpenAIApi(configuration);

export function GET(req) {
  return NextResponse.json({ message: "GET METHOD" });
}

export async function POST(req) {
  const body = await req.json();

  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error("PROMPT is required", { status: 400 }));
  }

  try {
    const response = await openai.createCompletion({
      prompt: `Dame un chiste para programadores enfocado en el tema: ${body.prompt}`,
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 60,
    });
    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
