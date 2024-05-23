import { Schema, model, models } from "mongoose";
interface IAirport {
  airportCode: string;
  airportName: string;
  location: string;
}
const airportSchema = new Schema<IAirport>({
  airportCode: {
    type: String,
    required: true,
  },
  airportName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Airport = models.Airport || model<IAirport>("Airport", airportSchema);
export default Airport;
