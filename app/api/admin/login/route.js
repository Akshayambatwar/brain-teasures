import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_auth", password, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;
}