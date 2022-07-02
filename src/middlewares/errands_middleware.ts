import express, { Request, Response, NextFunction } from 'express';
import { ErrandsEntity } from '../database/entities'
import { HttpError } from '../error'
import { HttpBadRquestCode, equalId } from '../constants'

export async function verifyId (request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;        
    const errands = await ErrandsEntity.find();
    
    if (errands.find(errand => errand.id === Number(id))) {
        throw new HttpError(equalId, HttpBadRquestCode);
    }
    next();
}

export const validateFields = (request: Request, response: Response, next: NextFunction) => {
    const { description, detailing } = request.body;
    
    if (description.length < 3 || description.length > 255 || detailing.length < 3 || detailing.length > 255 ) {
        
        return response.status(400).json({
            mensagem: 'Por favor, preeencha os campos descrição e detalhes corretamente'
        })
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
    }
   next();
}