import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb"; // ✅ using your existing file
import Subscription from "@/models/Subscription";

export async function GET() {
  try {
    await connectMongo();
    const subscriptions = await Subscription.find().populate("photographer");
    return NextResponse.json(subscriptions, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const body = await req.json();
    const newSub = await Subscription.create(body);
    return NextResponse.json(newSub, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
