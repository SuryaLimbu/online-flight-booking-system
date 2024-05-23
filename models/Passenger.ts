import { Schema, models, model } from "mongoose";

interface IPassenger {
  fullName: string;
  gender: string;
  age: number;
  passportNumber: string;
  emergencyContact: string;
}

const passengerSchema = new Schema<IPassenger>({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  passportNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
});

const Passenger = models.Passenger || model<IPassenger>("Passenger", passengerSchema);

export default Passenger;
