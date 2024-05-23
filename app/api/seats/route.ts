import { createSeat, deleteSeat, getAllSeats, updateSeat } from "@/controllers/seatController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllSeats(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createSeat(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateSeat(req);
}

export async function DELETE(req: Request) {
  await connectDB();
  return deleteSeat(req);
}
