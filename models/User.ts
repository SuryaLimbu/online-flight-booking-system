import mongoose, { model, models, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  contactDetails: string;
  gender: string;
  roleId: mongoose.Schema.Types.ObjectId;
  dateOfBirth: Date;
  nationality: string;
  passportNumber: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
