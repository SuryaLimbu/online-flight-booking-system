
import { createRole, getAllRoles, updateRole } from "@/controllers/roleController";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/controllers/userController";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  return getAllRoles(req);
}

export async function POST(req: Request) {
  await connectDB();
  return createRole(req);
}

