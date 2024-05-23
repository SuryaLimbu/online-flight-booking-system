import mongoose, { model, models } from "mongoose";

interface IFlight extends Document {
  flightNumber: string;
  departureAirport: mongoose.Schema.Types.ObjectId;
  arrivalAirport: mongoose.Schema.Types.ObjectId;
  departureTime: Date;
  arrivalTime: Date;
  aircraft: mongoose.Schema.Types.ObjectId;
}

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  departureAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  arrivalAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  aircraft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aircraft",
    required: true,
  },
});

const Flight = models.Flight || model<IFlight>("Flight", flightSchema);

export default Flight;