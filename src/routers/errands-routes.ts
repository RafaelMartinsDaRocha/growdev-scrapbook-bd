import { Router } from 'express';
import ErrandsController from '../controllers/errands-controller';
import { validateFields, validateId, verifyId } from '../middlewares'
import { ErrandsService } from '../services';
import { CacheRepository } from '../database/repositories'

export default class ErrandsRoutes {
    init() {
        const routes = Router();
        const service = new ErrandsService();
        const cacheRepository = new CacheRepository();
        const controller = new ErrandsController(service, cacheRepository);

        routes.get('/errands', controller.index);
        routes.post('/errands', [validateFields, verifyId], controller.store);
        routes.put('/errands/:id', [validateFields, validateId], controller.update);
        routes.delete('/errands/:id', [validateId], controller.delete);

        return routes;
    } 
}