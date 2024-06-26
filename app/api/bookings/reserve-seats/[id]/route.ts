import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookedSeatIdsByFlight,
  updateBooking,
} from "@/controllers/bookingController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getBookedSeatIdsByFlight(req);
}


