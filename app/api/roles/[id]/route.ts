import {
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "@/controllers/roleController";

import connectDB from "@/lib/mongodb";



export async function DELETE(req: Request) {
  await connectDB();
  return deleteRole(req);
}

export async function PUT(req: Request) {
  await connectDB();
  return updateRole(req);
}
