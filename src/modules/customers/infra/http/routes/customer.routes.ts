import { Router } from 'express';
import CustomerController from '../controller/CustomerController';
import { celebrate, Joi, Segments } from 'celebrate';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.get('/', customerController.index);

customerRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      status: Joi.equal(['inNegociation', 'active', 'inactive']),
    },
  }),
  customerController.create,
);

customerRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.show,
);

customerRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      status: Joi.equal(['inNegociation', 'active', 'inactive']),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.update,
);

customerRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

export default customerRoutes;
