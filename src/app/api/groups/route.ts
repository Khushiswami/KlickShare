import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Group from "@/models/Group";

export async function GET() {
  await connectMongo();
  const groups = await Group.find().populate("photos");
  return NextResponse.json(groups);
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();
  const group = await Group.create(body);
  return NextResponse.json(group);
}
