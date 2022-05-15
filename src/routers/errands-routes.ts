import { Router } from 'express';
import ErrandsController from '../controllers/errands-controller';

export default class ErrandsRoutes {
    initialize() {
        const routes = Router();
        const controller = new ErrandsController();

        routes.get('/errands', controller.index);
        routes.get('/errands/:id', controller.show);
        routes.post('/errands', controller.store);
        routes.put('/errands/:id', controller.update);
        routes.delete('/errands/:id', controller.delete);

        return routes;
    } 
}