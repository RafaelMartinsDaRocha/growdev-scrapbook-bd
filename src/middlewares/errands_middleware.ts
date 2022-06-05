import express, { Request, Response, NextFunction } from 'express';
import { ErrandsEntity } from '../database/entities'
import { HttpError } from '../error'
import { HttpBadRquestCode, invalidField, equalId } from '../constants'

export async function verifyId (request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;        
    const errands = await ErrandsEntity.find();
    
    if (errands.find(errand => errand.id === Number(id))) {
        throw new HttpError(equalId, HttpBadRquestCode);
    }

    next();
}

export function validateFields (request: Request, response: Response, next: NextFunction) {
    const { description, detailing } = request.body;

    if (!description || !detailing) {
        return response.status(400).json({
            mensagem: 'Por favor, preeencha os campos descrição e detalhes corretamente'
        })
        // throw new HttpError(invalidField('descrição e detalhes'), HttpBadRquestCode);
    }
    next();
}

export async function validateId (request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const errands = await ErrandsEntity.find();

    const errandId = (errands.find(errand => errand.id === Number(id)))

    if (!errandId) {
        return response.status(404).json({
            mensagem: 'Recado não encontrado'
        })
    
        // throw new HttpError('Recado não encontrado.', 404);        
    }

   next();
}
