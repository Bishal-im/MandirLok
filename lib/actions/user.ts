"use server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import mongoose from "mongoose";

async function getAuthUser() {
  const token = cookies().get("mandirlok_token")?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) return null;

  return decoded.userId;
}

export async function toggleChadhavaFavorite(chadhavaId: string) {
  try {
    const userId = await getAuthUser();
    if (!userId) return { success: false, message: "Please login to favorite" };

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    const favIndex = user.savedChadhava.findIndex(
      (id) => id.toString() === chadhavaId
    );

    let isAdded = false;
    if (favIndex > -1) {
      user.savedChadhava.splice(favIndex, 1);
    } else {
      user.savedChadhava.push(new mongoose.Types.ObjectId(chadhavaId) as any);
      isAdded = true;
    }

    await user.save();
    return { success: true, isAdded };
  } catch (error: any) {
    console.error("toggleChadhavaFavorite error:", error);
    return { success: false, message: error.message };
  }
}

export async function getUserFavorites() {
  try {
    const userId = await getAuthUser();
    if (!userId) return { success: true, data: [] };

    await connectDB();
    const user = await User.findById(userId).select("savedChadhava");
    return { success: true, data: user?.savedChadhava.map(id => id.toString()) || [] };
  } catch (error: any) {
    console.error("getUserFavorites error:", error);
    return { success: false, message: error.message };
  }
}

export async function toggleTempleFavorite(templeId: string) {
  try {
    const userId = await getAuthUser();
    if (!userId) return { success: false, message: "Please login to favorite" };

    await connectDB();

    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    const favIndex = user.savedTemples.findIndex(
      (id) => id.toString() === templeId
    );

    let isAdded = false;
    if (favIndex > -1) {
      user.savedTemples.splice(favIndex, 1);
    } else {
      user.savedTemples.push(new mongoose.Types.ObjectId(templeId) as any);
      isAdded = true;
    }

    await user.save();
    return { success: true, isAdded };
  } catch (error: any) {
    console.error("toggleTempleFavorite error:", error);
    return { success: false, message: error.message };
  }
}

export async function getUserTempleFavorites() {
  try {
    const userId = await getAuthUser();
    if (!userId) return { success: true, data: [] };

    await connectDB();
    const user = await User.findById(userId).select("savedTemples");
    return { success: true, data: user?.savedTemples.map(id => id.toString()) || [] };
  } catch (error: any) {
    console.error("getUserTempleFavorites error:", error);
    return { success: false, message: error.message };
  }
}
