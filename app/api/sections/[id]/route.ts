
import { getSectionById } from "@/controllers/sectionController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getSectionById(req);
}
