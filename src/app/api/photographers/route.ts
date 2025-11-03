
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import BusinessDetail from "@/models/BusinessDetail";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const status = searchParams.get("status") || "";

    await connectMongo();

    const filter: any = {};
    if (status) filter.status = status;

    const fieldsToSend = "name companyName mobileNumber status";

    const total = await User.countDocuments(filter);
    const docs = await User.find(filter)
      .select(fieldsToSend)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    
    return NextResponse.json({ data: docs, total });
  } catch (err: any) {
    console.error("GET /api/photographers error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      mobileNumber,
      otp,
      email,
      companyName,
      specialization,
      experience,
      portfolio,
    } = body;

    if (!name || !companyName || !mobileNumber || !email || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongo();

    // Check if user already exists (by mobile or email)
    let existingUser = await User.findOne({ mobileNumber });

    if (!existingUser) {
      // Create new user if not exists
      existingUser = await User.create({
        name,
        mobileNumber,
        email,
        otp,
        status: "active",
        userType: "photographer", // Set directly
      });
    } else {
      // Update user type if not already photographer
      if (existingUser.userType !== "photographer") {
        existingUser.userType = "photographer";
        await existingUser.save();
      }
    }

    // Check if business detail already exists to prevent duplicates
    const existingBusiness = await BusinessDetail.findOne({ userId: existingUser._id });

    if (existingBusiness) {
      return NextResponse.json(
        { error: "Business detail already exists for this user." },
        { status: 409 }
      );
    }

    // Create business detail for this user
    const newBusiness = await BusinessDetail.create({
      userId: existingUser._id,
      companyName,
      specialization,
      experience,
      portfolio,
    });

   const response = NextResponse.json(
      {
        message: "Photographer registered successfully.",
        data: {
          user: existingUser,
          businessDetail: newBusiness,
        },
      },
      { status: 201 }
    );
    response.cookies.set("user_token", String(existingUser._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("POST /api/photographers error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}