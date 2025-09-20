import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import {NextRequest, NextResponse } from "next/server";


type ParamsPromise= Promise<{id:string}>;

export async function GET(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
   
    await connectMongo();
    const doc = await User.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {
    
    const body = await req.json();
    await connectMongo();
    const updated = await User.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {

    const body = await req.json();
    await connectMongo();
    const doc = await User.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (body.action === "toggleStatus") {
      doc.status = doc.status === "active" ? "inactive" : "active";
    } else if (body.status) {
      doc.status = body.status;
    } else {
      if (body.name !== undefined) doc.name = body.name;
      if (body.mobileNumber !== undefined) doc.mobileNumber = body.mobileNumber;
    }

    await doc.save();
    return NextResponse.json({ data: doc });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context:{ params :ParamsPromise}):Promise<NextResponse>{
  const {id}=await context.params;
  try {

    await connectMongo();
    const doc = await User.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
