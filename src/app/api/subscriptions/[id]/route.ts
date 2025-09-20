import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb"; // ✅ using your existing file
import Subscription from "@/models/Subscription";


type ParamsPromise= Promise<{id:string}>;

export async function GET(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    await connectMongo();
    const subscription = await Subscription.findById(id).populate("photographer");
    if (!subscription) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(subscription, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    await connectMongo();
    const body = await req.json();
    const subscription = await Subscription.findByIdAndUpdate(id, body, { new: true });
    if (!subscription) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(subscription, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    await connectMongo();
    const subscription = await Subscription.findByIdAndDelete(id);
    if (!subscription) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
