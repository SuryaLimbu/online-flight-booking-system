import { Schema, model, models } from "mongoose";

interface ISection {
  sectionName: string;
  numberOfSeats: number;
  pricePerSeat: number;
}
const sectionSchema = new Schema<ISection>({
  sectionName: {
    type: String,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  pricePerSeat: {
    type: Number,
    required: true,
  },
});

const Section = models.Section || model<ISection>("Section", sectionSchema);

export default Section;
