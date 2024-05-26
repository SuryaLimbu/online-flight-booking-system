
import { deleteAirport, getAirportById, updateAirport } from "@/controllers/airportController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAirportById(req);
}
export async function PUT(req: Request) {
  await connectDB();
  return updateAirport(req);
}


export async function DELETE(req: Request) {
  await connectDB();
  return deleteAirport(req);
}
