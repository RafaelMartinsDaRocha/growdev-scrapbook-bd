import { Request, Response } from 'express';
import { ErrandsService } from '../services';

export default class ErrandsController {
    async index(request: Request, response: Response) {
        const service = new ErrandsService();
        const errands = await service.find();

        return response.json(errands)
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
            throw response.json({ //TODO
                mensage: 'Ocorreu um erro, tente novamente mais tarde'
            })
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { description, detailing } = request.body;
        const service = new ErrandsService();
        const errand = await service.update({
            id: parseInt(id),
            description,
            detailing
        })

        return response.json(errand)
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const service = new ErrandsService();
        await service.delete(parseInt(id));

        return response.sendStatus(204);
    }
};