import { Request, Response } from 'express';
import { ErrandsService } from '../services';
import { HttpError } from '../error'
import { HttpInternalErrorCode, defaultErrorMessage } from '../constants'
import { CacheRepository } from '../database/repositories';

export default class ErrandsController {
    async index(request: Request, response: Response) {
        const service = new ErrandsService();
        const cacheRepository = new CacheRepository();

        try {
            const cache = await cacheRepository.get('errands:all');

            if (cache) {
                return response.json(cache)
            }

            const errands = await service.find();

            await cacheRepository.set('errands:all', errands)
    
            return response.json(errands)
        } catch (error) { 
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async store(request: Request, response: Response) {
        const { description, detailing } = request.body;
        const service = new ErrandsService();
        const cacheRepository = new CacheRepository();

        try {
            const errand = await service.create({
                description,
                detailing
            });

            await cacheRepository.del('errands:all');

            return response.json(errand);
        } catch (error) { 
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { description, detailing } = request.body;
        const service = new ErrandsService();
        const cacheRepository = new CacheRepository();

        try {
            const errand = await service.update({
                id: parseInt(id),
                description,
                detailing
            })
            await cacheRepository.set(`errand:${id}`, errand);

            return response.json(errand)
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const service = new ErrandsService();
        const cacheRepository = new CacheRepository();

        try {
            await service.delete(parseInt(id));

            await cacheRepository.del(`errand:${id}`);
            await cacheRepository.del('errands:all');
    
            return response.sendStatus(204);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}