import { Router } from 'express';
import CustomerController from '../controller/CustomerController';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.get('/', customerController.index);
customerRoutes.post('/', customerController.create);
customerRoutes.get('/:id', customerController.show);
customerRoutes.put('/:id', customerController.update);
customerRoutes.delete('/:id', customerController.delete);

export default customerRoutes;
