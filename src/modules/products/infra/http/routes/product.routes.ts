import { Router } from 'express';
import ProductController from '../controller/ProductController';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.index);
productRoutes.post('/', productController.create);
productRoutes.get('/:id', productController.show);
productRoutes.put('/:id', productController.update);
productRoutes.delete('/:id', productController.delete);

export default productRoutes;
