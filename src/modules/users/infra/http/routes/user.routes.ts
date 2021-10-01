import { Router } from 'express';
import UserController from '../controller/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.index);
userRoutes.post('/', userController.create);
userRoutes.get('/:id', userController.show);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);

export default userRoutes;
