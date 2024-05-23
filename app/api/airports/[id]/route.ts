
import { getAirportById } from "@/controllers/airportController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAirportById(req);
}
