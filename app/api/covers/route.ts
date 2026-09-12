import { NextResponse } from "next/server";
import { saveCoverDataUrl } from "@/lib/books";

export async function POST(request: Request) {
  try {
    const { dataUrl } = await request.json();

    if (typeof dataUrl !== "string") {
      return NextResponse.json({ error: "No image supplied." }, { status: 400 });
    }

    const url = await saveCoverDataUrl(dataUrl);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not upload cover.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
