import {
  createFlight,
  getAllFlights,
  updateFlight,
} from "@/controllers/flightController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllFlights(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createFlight(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateFlight(req);
}
