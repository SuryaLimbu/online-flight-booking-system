import mongoose, { model, models } from "mongoose";
import User from "./User";
import Seat from "./Seat";
import Aircraft from "./Aircraft";
import Flight from "./Flight";

interface IPassenger {
  fullName: string;
  gender: string;
  age: Date;
  passportNumber: string;
  emergencyContact: string;
}

interface IBooking extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  seatId: mongoose.Schema.Types.ObjectId[];
  aircraftId: mongoose.Schema.Types.ObjectId;
  passengers: IPassenger[];
  flightId: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
}

const passengerSchema = new mongoose.Schema<IPassenger>({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Date, required: true },
  passportNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    seatId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Seat,
        required: true,
      },
    ],
    aircraftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Aircraft,
      required: true,
    },
    passengers: [passengerSchema],
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Flight,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Booking = models.Booking || model<IBooking>("Booking", bookingSchema);

export default Booking;
