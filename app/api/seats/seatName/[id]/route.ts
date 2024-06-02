import { getSeatByName } from "@/controllers/seatController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getSeatByName(req);
}