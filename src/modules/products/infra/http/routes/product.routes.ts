import { Router } from 'express';
import ProductController from '../controller/ProductController';
import { celebrate, Joi, Segments } from 'celebrate';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.index);

productRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().precision(2).required(),
      type: Joi.equal('perpetual', 'monthly', 'yearly').required(),
      active: Joi.bool().required(),
    },
  }),
  productController.create,
);

productRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.show,
);

productRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().precision(2).required(),
      type: Joi.equal('perpetual', 'monthly', 'yearly').required(),
      active: Joi.bool().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.update,
);

productRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete,
);

export default productRoutes;
