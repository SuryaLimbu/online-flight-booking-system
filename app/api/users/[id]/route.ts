import { deleteUser, getUserById } from "@/controllers/userController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getUserById(req);
}

export async function DELETE(req: Request) {
  await connectDB();
  return deleteUser(req);
}
