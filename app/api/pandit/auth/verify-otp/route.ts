import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Pandit from "@/models/Pandit";
import Otp from "@/models/Otp";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { phone, email, otp } = await req.json();

    if ((!phone && !email) || !otp) {
      return NextResponse.json(
        { success: false, message: "Identifier (Phone or Email) and OTP are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Identifier for OTP storage
    const identifier = phone ? `pandit:${phone}` : `pandit:${email}`;

    // Find stored OTP
    const otpRecord = await Otp.findOne({ email: identifier });
    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "OTP not found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check expiry
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Find pandit
    const query = phone ? { phone, isActive: true } : { email, isActive: true };
    const pandit = await Pandit.findOne(query);
    if (!pandit) {
      return NextResponse.json(
        { success: false, message: "Pandit account not found or deactivated" },
        { status: 404 }
      );
    }


    // Delete used OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    // Generate JWT
    const token = jwt.sign(
      { panditId: pandit._id.toString() },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set httpOnly cookie
    const response = NextResponse.json({ success: true, message: "Login successful" });
    response.cookies.set("mandirlok_pandit_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Pandit verify-otp error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
