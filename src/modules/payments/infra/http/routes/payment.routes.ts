import { Router } from 'express';
import PaymentController from '../controller/PaymentController';

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post('/', paymentController.create);
paymentRoutes.delete('/:id', paymentController.delete);

export default paymentRoutes;
