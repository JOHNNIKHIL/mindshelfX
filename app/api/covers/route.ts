import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No cover image supplied." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Unsupported cover image. Use JPG, PNG or WebP." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Cover must be smaller than 8 MB." }, { status: 400 });
    }

    const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
    const baseName = file.name.replace(/\.[^/.]+$/, "").trim().replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100) || "book-cover";
    const pathname = `covers/${baseName}.${extension}`;

    const blob = await put(pathname, file, { access: "public", addRandomSuffix: true });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname }, { status: 201 });
  } catch (error) {
    console.error("Cover upload failed:", error);
    const message = error instanceof Error ? error.message : "Could not upload cover.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
