// backend/Controllers/paymentController.js
import Payment from '../models/Payment.js';

// GET all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: 1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { description, amount, date, notes } = req.body;
    // Create new Payment instance (Mongoose will convert date string to Date automatically)
    const payment = new Payment({
      description,
      amount,
      date,
      notes,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, notes } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      id,
      { description, amount, date, notes },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};