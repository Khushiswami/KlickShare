import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Group from "@/models/Group";
// import connectMongo from '../../../../lib/mongodb.ts';

// connectMongo();

// ✅ Get single group by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const group = await Group.findById(params.id);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json(group);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Update group (replace full document)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const body = await req.json();
    const updated = await Group.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Partial update (e.g., toggle status)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const body = await req.json();
    const updated = await Group.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Delete group
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const deleted = await Group.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Group deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
