
import { deleteBooking, getBookingById } from "@/controllers/bookingController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getBookingById(req);
}
export async function DELETE(req: Request) {
  await connectDB();
  return deleteBooking(req);
}
