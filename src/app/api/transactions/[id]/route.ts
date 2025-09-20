import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const transaction = await Transaction.findById(params.id).populate("user");
    if (!transaction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(transaction, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const body = await req.json();
    const transaction = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
    if (!transaction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(transaction, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const transaction = await Transaction.findByIdAndDelete(params.id);
    if (!transaction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
