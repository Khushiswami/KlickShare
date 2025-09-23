
import connectMongo from "@/lib/mongodb";
import Photographer from "@/models/Photographer";
import { NextRequest, NextResponse } from "next/server";

type ParamsPromise = Promise<{ id: string }>;

export async function GET(req: NextRequest, context: { params: ParamsPromise }): Promise<NextResponse> {
  const { id } = await context.params;
  try {
    await connectMongo();
    const doc = await Photographer.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    console.error("GET /api/photographers/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: ParamsPromise }): Promise<NextResponse> {
  const { id } = await context.params;
  try {
    const body = await req.json();
    await connectMongo();
    const updated = await Photographer.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error("PUT /api/photographers/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: ParamsPromise }): Promise<NextResponse> {
  const { id } = await context.params;
  try {
    const body = await req.json();
    await connectMongo();
    const doc = await Photographer.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (body.action === "toggleStatus") {
      doc.status = doc.status === "active" ? "inactive" : "active";
    } else {
      if (body.name !== undefined) doc.name = body.name;
      if (body.companyName !== undefined) doc.companyName = body.companyName;
      if (body.mobileNumber !== undefined) doc.mobileNumber = body.mobileNumber;
      if (body.email !== undefined) doc.email = body.email;
      if (body.otp !== undefined) doc.otp = body.otp;
      if (body.status !== undefined) doc.status = body.status;
    }

    await doc.save();
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    console.error("PATCH /api/photographers/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: ParamsPromise }): Promise<NextResponse> {
  const { id } = await context.params;
  try {
    await connectMongo();
    const doc = await Photographer.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/photographers/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

