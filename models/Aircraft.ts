import { Schema, model, models } from "mongoose";
interface IAircraft {
  aircraftRegisteredNumber: string;
  aircraftModel: string;
  capacity: number;
}

const aircraftSchema = new Schema<IAircraft>({
  aircraftRegisteredNumber: {
    type: String,
    required: true,
  },
  aircraftModel: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const Aircraft =
  models.Aircraft || model<IAircraft>("Aircraft", aircraftSchema);

export default Aircraft;
