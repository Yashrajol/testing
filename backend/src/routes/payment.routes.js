import { Router } from 'express';
import { getMyInvoices, initiateCheckout, handlePaymentWebhook, getPaymentReceipt } from '../controllers/payment.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/payments/invoices/me', authenticateToken, getMyInvoices);
router.post('/payments/checkout', authenticateToken, initiateCheckout);
router.post('/payments/webhook', handlePaymentWebhook);
router.get('/payments/receipt/:id', authenticateToken, getPaymentReceipt);

export default router;
