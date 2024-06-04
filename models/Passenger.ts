import mongoose, { Schema, models, model } from "mongoose";

interface IPassenger extends Document {
  bookingId: mongoose.Schema.Types.ObjectId;
  fullName: string;
  gender: string;
  age: Date;
  passportNumber: string;
  emergencyContact: string;
}

const passengerSchema = new Schema<IPassenger>({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Date, required: true },
  passportNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
});

const Passenger =
  models.Passenger || model<IPassenger>("Passenger", passengerSchema);

export default Passenger;
