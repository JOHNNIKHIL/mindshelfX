import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { dataUrl } = await request.json();

    if (typeof dataUrl !== "string") {
      return NextResponse.json(
        { error: "No image supplied." },
        { status: 400 }
      );
    }

    // Covers are temporarily stored directly in PostgreSQL as a data URL.
    // This avoids Vercel's read-only filesystem. We will move covers to
    // object storage in the next storage step.
    const match = dataUrl.match(
      /^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/
    );

    if (!match) {
      return NextResponse.json(
        { error: "Unsupported cover image. Use JPG, PNG or WebP." },
        { status: 400 }
      );
    }

    // Keep database records reasonably sized during this interim storage phase.
    const base64Payload = match[2];
    const approximateBytes = Math.floor((base64Payload.length * 3) / 4);

    if (approximateBytes > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "For now, covers must be smaller than 2 MB." },
        { status: 400 }
      );
    }

    return NextResponse.json({ url: dataUrl }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not upload cover.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
