import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToDB from '../../../../lib/db';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

    const { mobileNumber, otp } = await req.json();

    if (!mobileNumber || !otp) {
      return NextResponse.json({ error: 'Missing mobile number or OTP' }, { status: 400 });
    }

    // Find user by mobileNumber
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check OTP and expiry
    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (user.otpExpiry < new Date()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    // Create payload for JWT (select only safe info)
    const payload = {
      id: user._id,
      userType: user.userType,
      mobileNumber: user.mobileNumber,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    // Clear OTP fields
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Create response and set cookie
    const response = NextResponse.json({ success: true, user: payload });

    response.cookies.set('Klickshare', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
