
import {getBookingByUserId } from "@/controllers/bookingController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getBookingByUserId(req);
}
