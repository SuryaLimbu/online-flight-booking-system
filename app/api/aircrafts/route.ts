import {
  createAircraft,
  deleteAircraft,
  getAllAircraft,
  updateAircraft,
} from "@/controllers/aircraftController";
import connectDB from "@/lib/mongodb";
import exp from "constants";
import { request } from "http";

// GET request handler
export async function GET(req: Request) {
  await connectDB();
  return getAllAircraft(req);
}

// POST request handler
export async function POST(req: Request) {
  await connectDB();
  return createAircraft(req);
}


