import { Router } from 'express';
import customerRoutes from '../../../modules/customers/infra/http/routes/customer.routes';
import paymentRoutes from '../../../modules/payments/infra/http/routes/payment.routes';
import productRoutes from '../../../modules/products/infra/http/routes/product.routes';
import sessionRouter from '../../../modules/users/infra/http/routes/session.routes';
import userRoutes from '../../../modules/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/customers', customerRoutes);
routes.use('/payments', paymentRoutes);

export default routes;
