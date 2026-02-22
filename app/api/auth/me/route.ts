import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("mandirlok_token")?.value;
        console.log(`[AUTH/ME] Token present: ${!!token}`);

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify token
        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            console.log(`[AUTH/ME] Token decoded successfully: ${decoded.userId}`);
        } catch (err: any) {
            console.error(`[AUTH/ME] Token verify failed: ${err.message}`);
            return NextResponse.json(
                { success: false, message: "Invalid token: " + err.message },
                { status: 401 }
            );
        }

        await connectDB();
        const user = await User.findById(decoded.userId).select("-password -__v").lean();

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        console.error("Auth me error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}