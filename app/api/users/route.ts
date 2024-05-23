
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/controllers/userController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllUsers(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createUser(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateUser(req);
}
