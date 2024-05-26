import {
  createFlight,
  getAllFlights,
  specificFlightData,
  updateFlight,
} from "@/controllers/flightController";

import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return specificFlightData(req);
}


