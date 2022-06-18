import { Request, Response } from 'express';
import { HttpError } from '../error'
import { HttpInternalErrorCode, defaultErrorMessage } from '../constants'
import { ErrandsServiceInterface } from '../contracts/services';
import { CacheRepositoryInterface } from '../contracts/repositories';

export default class ErrandsController {
    constructor(private service: ErrandsServiceInterface, 
                private cacheRepository: CacheRepositoryInterface) {}

    index = async (request: Request, response: Response) => {
        try {
            const cache = await this.cacheRepository.get('errands:all');

            if (cache) {
                return response.json(cache)
            }

            const errands = await this.service.find();

            await this.cacheRepository.set('errands:all', errands)
    
            return response.json(errands)
        } catch (error) { 
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    store = async (request: Request, response: Response) => {
        const { description, detailing } = request.body;

        try {
            const errand = await this.service.create({
                description,
                detailing
            });

            await this.cacheRepository.del('errands:all');

            return response.json(errand);
        } catch (error) { 
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    update = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { description, detailing } = request.body;

        try {
            const errand = await this.service.update({
                id: parseInt(id),
                description,
                detailing
            })

            await this.cacheRepository.del(`errand:${id}`);
            await this.cacheRepository.del('errands:all');

            return response.json(errand)
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    delete = async (request: Request, response: Response) => {
        const { id } = request.params;

        try {
            await this.service.delete(parseInt(id));

            await this.cacheRepository.del(`errand:${id}`);
            await this.cacheRepository.del('errands:all');
    
            return response.sendStatus(204);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}