import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// GET all transactions
export async function GET() {
  try {
    await connectMongo();
    const transactions = await Transaction.find().populate("user");
    return NextResponse.json(transactions, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Create new transaction
export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
