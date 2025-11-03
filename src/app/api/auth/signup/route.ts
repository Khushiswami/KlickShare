import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobileNumber, usertype } = body;

    if (!name || !email || !mobileNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Signup Data Received:", { name, email, mobileNumber, usertype });

    return NextResponse.json(
      { message: "Signup successful!", user: { name, email, mobileNumber, usertype } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}