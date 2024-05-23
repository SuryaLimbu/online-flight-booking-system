import { Schema, model, models } from "mongoose";

interface IRole {
  roleName: string;
  permissions: string;
}

const roleSchema = new Schema<IRole>({
  roleName: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    required: true,
  },
});

const Role = models.Role || model<IRole>("Role", roleSchema);

export default Role;
