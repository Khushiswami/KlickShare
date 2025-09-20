import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const status = searchParams.get("status") || "";

    await connectMongo();

    const filter: any = {};
    if (status) filter.status = status;

    const total = await User.countDocuments(filter);
    const docs = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ data: docs, total });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, mobileNumber, otp } = await req.json();
    if (!name || !mobileNumber || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongo();
    const created = await User.create({ name, mobileNumber, otp, status: "active" });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
