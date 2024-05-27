import mongoose, { Schema, model, models, mongo } from "mongoose";

interface ISection extends Document {
  aircraftId: mongoose.Schema.Types.ObjectId;
  sectionName: string;
  pricePerSeat: number;
}
const sectionSchema = new Schema<ISection>({
  aircraftId: {
    type: Schema.Types.ObjectId,
    ref: "Aircraft",
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
  },
  pricePerSeat: {
    type: Number,
    required: true,
  },
});

const Section = models.Section || model<ISection>("Section", sectionSchema);

export default Section;
