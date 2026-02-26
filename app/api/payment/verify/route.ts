import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Pooja from "@/models/Pooja";
import Chadhava from "@/models/Chadhava";
import Pandit from "@/models/Pandit";
import { sendWhatsApp } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. Get logged in user from JWT cookie
    const token = cookies().get("mandirlok_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      poojaId,
      templeId,
      bookingDate,
      qty = 1,
      chadhavaIds = [],
      sankalpName,
      gotra,
      dob,
      phone,
      whatsapp,
      sankalp,
      address,
    } = body;

    // 2. Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // 3. Fetch pooja (if provided) and chadhava details
    let poojaAmount = 0;
    let poojaName = "Sacred Offering";

    if (poojaId) {
      const pooja = await Pooja.findById(poojaId);
      if (!pooja) {
        return NextResponse.json(
          { success: false, message: "Pooja not found" },
          { status: 404 }
        );
      }
      poojaAmount = pooja.price * qty;
      poojaName = pooja.name;
    }

    // Build chadhava items array
    let chadhavaItems: { chadhavaId: string; name: string; price: number; emoji: string }[] = [];
    let chadhavaAmount = 0;

    if (chadhavaIds.length > 0) {
      const chadhavaList = await Chadhava.find({ _id: { $in: chadhavaIds } });
      chadhavaItems = chadhavaList.map((c) => ({
        chadhavaId: c._id.toString(),
        name: c.name,
        price: c.price,
        emoji: c.emoji,
      }));
      chadhavaAmount = chadhavaList.reduce((sum, c) => sum + c.price, 0);
    }

    const totalAmount = poojaAmount + chadhavaAmount;

    // 4. Save order to DB
    const orderObj: any = {
      userId: decoded.userId,
      templeId,
      bookingDate: new Date(bookingDate),
      sankalpName,
      gotra: gotra || "",
      dob: dob || "",
      phone,
      whatsapp,
      sankalp: sankalp || "",
      address: address || "",
      qty: Number(qty),
      chadhavaItems,
      poojaAmount,
      chadhavaAmount,
      totalAmount,
      paymentStatus: "paid",
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderStatus: "pending",
    };

    if (poojaId) {
      orderObj.poojaId = poojaId;
    }

    const order = await Order.create(orderObj);

    // 5. Auto-assign Pandit
    try {
      const assignedPandit = await Pandit.findOne({
        assignedTemples: templeId,
        isActive: true
      });

      if (assignedPandit) {
        await Order.findByIdAndUpdate(order._id, {
          panditId: assignedPandit._id,
          orderStatus: "confirmed"
        });

        // Notify devotee about pandit assignment
        try {
          await sendWhatsApp(
            whatsapp,
            `🙏 *Update on your Mandirlok Booking*\n\nYour *${poojaName}* has been assigned to:\n👤 *Pandit ${assignedPandit.name}*\n📱 ${assignedPandit.phone}\n\n📋 Booking ID: ${order.bookingId}\n📅 Date: ${new Date(bookingDate).toLocaleDateString("en-IN")}\n\n*Your pooja will be performed as scheduled. Stay blessed!* 🛕`
          );
        } catch (e) {
          console.error("[WhatsApp auto-assign - devotee notification failed]", e);
        }

        // Notify pandit
        try {
          await sendWhatsApp(
            assignedPandit.whatsapp,
            `🛕 *New Pooja Assigned — Mandirlok*\n\n📿 *Pooja:* ${poojaName}\n👤 *Devotee:* ${sankalpName}\n📅 *Date:* ${new Date(bookingDate).toLocaleDateString("en-IN")}\n📋 *Booking ID:* ${order.bookingId}\n\nPlease log in to your Pandit Portal to view full details.`
          );
        } catch (e) {
          console.error("[WhatsApp auto-assign - pandit notification failed]", e);
        }
      }
    } catch (e) {
      console.error("[Pandit auto-assignment failed]", e);
    }

    // 6. Send WhatsApp confirmation (Initial)
    try {
      await sendWhatsApp(
        whatsapp,
        `🙏 *Jai Shri Ram!*\n\nYour booking is confirmed on *Mandirlok*.\n\n📋 *Booking ID:* ${order.bookingId}\n📿 *Pooja:* ${poojaName}\n📅 *Date:* ${new Date(bookingDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}\n💰 *Amount Paid:* ₹${totalAmount}\n\nA pandit will be assigned shortly. You will receive another WhatsApp update.\n\n🛕 *Mandirlok — Divine Blessings Delivered*`
      );
    } catch (e) {
      console.error("[WhatsApp booking confirmation failed]", e);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and order created",
      data: {
        orderId: order._id,
        bookingId: order.bookingId,
      },
    });
  } catch (error: any) {
    console.error("POST /api/payment/verify error:");
    if (error.errors) {
      console.error(Object.keys(error.errors).map(k => `${k}: ${error.errors[k].message}`).join('\n'));
    } else {
      console.error(error);
    }
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}