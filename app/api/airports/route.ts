import {
  createAirport,
  deleteAirport,
  getAllAirports,
  updateAirport,
} from "@/controllers/airportController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllAirports(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createAirport(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateAirport(req);
}

export async function DELETE(req: Request) {
  await connectDB();
  return deleteAirport(req);
}
