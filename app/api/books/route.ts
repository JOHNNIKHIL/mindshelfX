import { NextResponse } from "next/server";
import { createBook, getBooks } from "@/lib/books";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(await getBooks(), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const book = await createBook(body);
    return NextResponse.json(book, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create book.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
