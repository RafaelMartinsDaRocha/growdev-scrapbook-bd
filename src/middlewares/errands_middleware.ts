import express, { Request, Response, NextFunction } from 'express';
import { ErrandsEntity } from '../database/entities'
import { HttpError } from '../error'

export async function verifyId (request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;        
    const errands = await ErrandsEntity.find();
    
    if (errands.find(errand => errand.id === Number(id))) {
        throw new HttpError('Recado já existe.', 400);
    }

    next();
}

export const validateFields = (request: Request, response: Response, next: NextFunction) => {
    const { description, detailing } = request.body;

    if (!description || !detailing) {
        throw new HttpError('Por favor, preencha todos os campos corretamente.', 400);
    }
    next();
}

export async function validateId (request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const errandId = await ErrandsEntity.findOne(id);
    
    if (!errandId) {
    throw new HttpError('Recado não encontrado.', 404);
    }

   next();
}
