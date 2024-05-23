import { getAircraftById } from "@/controllers/aircraftController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAircraftById(req);
}
