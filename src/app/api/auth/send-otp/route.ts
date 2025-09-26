import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToDB from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { mobileNumber } = await req.json();

    if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP expiry 5 minutes from now
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Find user or create new
    let user = await User.findOne({ mobileNumber });

    if (user) {
      // Update OTP and expiry
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      // Create new user with mobileNumber and OTP
      user = new User({ mobileNumber, otp, otpExpiry });
      await user.save();
    }

    return NextResponse.json({ success: true, otp }, { status: 200 });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
