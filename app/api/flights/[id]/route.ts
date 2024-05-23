
import { deleteFlight, getFlightById } from "@/controllers/flightController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getFlightById(req);
}

export async function DELETE(req: Request) {
  await connectDB();
  return deleteFlight(req);
}
