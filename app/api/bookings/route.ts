import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
} from "@/controllers/bookingController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllBookings(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createBooking(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateBooking(req);
}


