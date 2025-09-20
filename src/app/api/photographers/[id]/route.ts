

import connectMongo from "@/lib/mongodb";
import Photographer from "@/models/Photographer";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await connectMongo();
    const doc = await Photographer.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    await connectMongo();
    const updated = await Photographer.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await connectMongo();
    const doc = await Photographer.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

