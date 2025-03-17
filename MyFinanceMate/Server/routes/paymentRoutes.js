// backend/routes/paymentRoutes.js
import express from 'express';
import { getPayments, createPayment, updatePayment, deletePayment } from '../Controllers/paymentController.js';

const router = express.Router();

router.get('/', getPayments);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;