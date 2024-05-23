import mongoose, { Schema, model, models, mongo, Document } from "mongoose";

interface ITicket extends Document {
  flight: mongoose.Schema.Types.ObjectId;
  seatNumber: mongoose.Schema.Types.ObjectId;
  price: number;
}

const ticketSchema = new Schema<ITicket>({
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  seatNumber: {
    type: Schema.Types.ObjectId,
    ref: "Seat",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Ticket = models.Ticket || model<ITicket>("Ticket", ticketSchema);
export default Ticket;
