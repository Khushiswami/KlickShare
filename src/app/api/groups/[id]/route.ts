import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Group from "@/models/Group";

type ParamsPromise = Promise<{ id: string }>;

export async function GET(req: NextRequest, context: { params: ParamsPromise }) {
  const { id } = await context.params;
  await connectMongo();
  const group = await Group.findById(id).populate("photos");
  if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
  return NextResponse.json(group);
}

export async function PUT(req: NextRequest, context: { params: ParamsPromise }) {
  const { id } = await context.params;
  await connectMongo();
  const body = await req.json();
  const updated = await Group.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ error: "Group not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: ParamsPromise }) {
  const { id } = await context.params;
  await connectMongo();
  const deleted = await Group.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Group not found" }, { status: 404 });
  return NextResponse.json({ message: "Group deleted successfully" });
}
