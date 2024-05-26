import { deleteAircraft, getAircraftById, updateAircraft } from "@/controllers/aircraftController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAircraftById(req);
}
export async function PUT(req: Request) {
  await connectDB();
  return updateAircraft(req);
}
export async function DELETE(req: Request) {
  await connectDB();
  return deleteAircraft(req);
}
