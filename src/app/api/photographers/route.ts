
import connectMongo from "@/lib/mongodb";
import Photographer from "@/models/Photographer";
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

    const fieldsToSend = "name companyName mobileNumber status";

    const total = await Photographer.countDocuments(filter);
    const docs = await Photographer.find(filter)
      .select(fieldsToSend)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ data: docs, total });
  } catch (err: any) {
    console.error("GET /api/photographers error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, companyName, mobileNumber, email, otp, status } = body;

    if (!name || !companyName || !mobileNumber || !email || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongo();
    const created = await Photographer.create({
      name,
      companyName,
      mobileNumber,
      email,
      otp,
      status: status || "inactive",
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/photographers error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
