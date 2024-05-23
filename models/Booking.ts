import mongoose, { model, models } from "mongoose";

interface IBooking extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  seatId: mongoose.Schema.Types.ObjectId[];
  aircraftId: mongoose.Schema.Types.ObjectId;
  passengerId: mongoose.Schema.Types.ObjectId[];
  flightId: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seatId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true,
      },
    ],
    aircraftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aircraft",
      required: true,
    },
    passengerId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Passenger",
        required: true,
      },
    ],
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
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
