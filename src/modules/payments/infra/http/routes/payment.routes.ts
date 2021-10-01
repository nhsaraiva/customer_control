import { Router } from 'express';
import PaymentController from '../controller/PaymentController';
import { celebrate, Joi, Segments } from 'celebrate';

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      payment_date: Joi.date().required(),
      customer_id: Joi.string().uuid().required(),
      product_id: Joi.string().uuid().required(),
    },
  }),
  paymentController.create,
);

paymentRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  paymentController.delete,
);

export default paymentRoutes;
