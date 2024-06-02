import mongoose, { Schema, model, models } from "mongoose";

interface ISeat extends Document {
  sectionId: mongoose.Schema.Types.ObjectId;
  rowNumber: number;
  position: string;
  seatName: string;
  status: string;
}

const seatSchema = new Schema<ISeat>({
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  rowNumber: { type: Number, required: true },
  position: { type: String, required: true },
  seatName: { type: String, required: true },
  status: { type: String, default: "available" }, // default 1 indicates that the seat is available
});
const Seat = models.Seat || model<ISeat>("Seat", seatSchema);
export default Seat;
