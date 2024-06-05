
import { getBookingByFlightId } from "@/controllers/bookingController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getBookingByFlightId(req);
}
