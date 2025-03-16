import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { bodyPart } = await req.json();

    if (!bodyPart) {
      return NextResponse.json({ message: "部位が指定されていません。" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "あなたは筋トレの専門家です。" },
        { role: "user", content: `${bodyPart} を鍛えるためのトレーニング種目を3つ提案してください。` },
      ],
    });

    const suggestions = response.choices[0].message?.content || "提案が取得できませんでした。";
    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "エラーが発生しました", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "不明なエラーが発生しました" }, { status: 500 });
  }
}