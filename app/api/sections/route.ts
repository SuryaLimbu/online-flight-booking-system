import { createSection, deleteSection, getAllSections, updateSection } from "@/controllers/sectionController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllSections(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createSection(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateSection(req);
}

export async function DELETE(req: Request) {
  await connectDB();
  return deleteSection(req);
}
