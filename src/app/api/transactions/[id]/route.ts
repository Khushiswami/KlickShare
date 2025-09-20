import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Transaction from "@/models/Transaction";


type ParamsPromise= Promise<{id:string}>;

export async function GET(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    await connectMongo();
    const transaction = await Transaction.findById(id).populate("user");
    if (!transaction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(transaction, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    await connectMongo();
    const body = await req.json();
    const transaction = await Transaction.findByIdAndUpdate(id, body, { new: true });
    if (!transaction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(transaction, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    await connectMongo();
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
