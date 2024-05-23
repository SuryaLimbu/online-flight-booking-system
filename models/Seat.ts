import mongoose, { Schema, model, models } from "mongoose";

interface ISeat extends Document {
  sectionId: mongoose.Schema.Types.ObjectId;
  seatCode: string;
  seatStatus: string;
}

const seatSchema = new Schema<ISeat>({
  sectionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  seatCode: { type: String, required: true, unique: true },
  seatStatus: { type: String, required: true },
});
const Seat = models.Seat || model<ISeat>("Seat", seatSchema);
export default Seat;
