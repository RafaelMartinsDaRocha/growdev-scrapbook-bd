import { Request, Response } from 'express';
import { ErrandsService } from '../services';
import { HttpError } from '../error'
import { HttpInternalErrorCode, defaultErrorMessage } from '../constants'

export default class ErrandsController {
    async index(request: Request, response: Response) {
        const service = new ErrandsService();

        try {
            const errands = await service.find();
    
            return response.json(errands)
        } catch (error) { 
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async store(request: Request, response: Response) {
        const { description, detailing } = request.body;
        const service = new ErrandsService();

        try {
            const errand = await service.create({
                description,
                detailing
            });

            return response.json(errand);
        } catch (error) { 
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { description, detailing } = request.body;
        const service = new ErrandsService();

        try {
            const errand = await service.update({
                id: parseInt(id),
                description,
                detailing
            })
    
            return response.json(errand)
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const service = new ErrandsService();

        try {
            await service.delete(parseInt(id));
    
            return response.sendStatus(204);
        } catch {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}