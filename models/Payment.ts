import mongoose, {model, models } from "mongoose";

interface IPayment extends Document {
  bookingId: mongoose.Schema.Types.ObjectId;
  paymentDate: Date;
  amount: Number;
  paymentMethod: string;
  status: string;
}

const PaymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Payment = models.Payment || model<IPayment>("Payment", PaymentSchema);

export default Payment;
