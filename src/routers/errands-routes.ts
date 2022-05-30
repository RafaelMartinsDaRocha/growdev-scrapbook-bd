import { Router } from 'express';
import ErrandsController from '../controllers/errands-controller';
import { validateFields, validateId, verifyId } from '../middlewares'

export default class ErrandsRoutes {
    initialize() {
        const routes = Router();
        const controller = new ErrandsController();

        routes.get('/errands', controller.index);
        routes.post('/errands', [validateFields, verifyId], controller.store);
        routes.put('/errands/:id', [validateFields, validateId], controller.update);
        routes.delete('/errands/:id', [validateId], controller.delete);

        return routes;
    } 
}