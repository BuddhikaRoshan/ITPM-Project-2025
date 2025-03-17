import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String }, // Optional field
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;