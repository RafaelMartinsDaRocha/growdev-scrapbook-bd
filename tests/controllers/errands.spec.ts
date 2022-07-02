import ErrandsController from '../../src/controllers/errands-controller';
import { ErrandsService } from '../../src/services/errands-service';
import { CacheRepository } from '../../src/database/repositories';
import { Request, Response } from 'express';
import { HttpError } from '../../src/error';

jest.mock('../../src/database/repositories/errands-repository.ts');
jest.mock('../../src/database/repositories/cache-repository.ts');

const makeSut = () => {
    const service = new ErrandsService();
    const cache = new CacheRepository();

    return new ErrandsController(service, cache);
}

describe('Errands Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('Index', () => {
        it('should return a list of errands', async () => {
            const sut = makeSut();
            const dto = [{
                id: 1,
                description: 'any description',
                detailing: 'any detail'
            }]

            jest.spyOn(ErrandsService.prototype, 'find').mockResolvedValue(dto);

            const request = {} as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn(),
            };

            const responseController = await sut.index(request, response);

            expect(responseController).toEqual(dto);
        });

        it('should call CacheRepository...', async () => {
        const sut = makeSut();
        const dto = [{
            description: 'any description',
            detailing: 'any detail'
        }];
    
        jest.spyOn(ErrandsService.prototype, 'find').mockResolvedValue(dto.map(item => ({...item, id: 1})));
    
        const getSpy = jest.spyOn(CacheRepository.prototype, 'get').mockRejectedValue(null);
        const setSpy = jest.spyOn(CacheRepository.prototype, 'set');
    
        const request = {} as Request;
        const response: any = {
            json: jest.fn().mockResolvedValue(dto),
            status: jest.fn()
        };
    
        await sut.index(request, response);
    
        expect(getSpy).toHaveBeenCalledWith('errands:all')
        expect(setSpy).toHaveBeenCalledWith('errands:all, dto')
        });

        it('should throw new error...', async () => {
            const sut = makeSut();
            const dto = [{
                description: 'any description',
                detailing: 'any detail'
            }];

            jest.spyOn(CacheRepository.prototype, 'get')
                .mockRejectedValue(new Error('Cache indisponível')); 
            
            const request = {} as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };
            const responseController = await sut.index(request, response);

            expect(responseController).toThrow(HttpError);
        })
    })

    describe('Store', () => {
        it('should create a errands', async () => {
            const sut = makeSut();
            const dto = {
                id: 1,
                description: 'any description',
                detailing: 'any detail'
            };

            jest.spyOn(ErrandsService.prototype, 'create')
                .mockResolvedValue(dto);
            
            const request = {
                body: {
                    description: 'Descrição...',
                        detailing: 'Detalhe...'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const responseController = await sut.store(request, response);

            expect(responseController).toBeTruthy();
            expect(responseController).toHaveProperty('description');

            expect.assertions(2);
        });
        
         it('should throw a error...', async () => {
            const sut = makeSut();
            const dto = {
                id: 1,
                description: '',
                detailing: 'any detail'
            };

            jest.spyOn(ErrandsService.prototype, 'create')
                .mockResolvedValue(dto);
            
            const request = {
                body: {}
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };
            
            const responseController = await sut.store(request, response);

            expect(responseController.status).toBe(400);
            expect(responseController.json).toHaveProperty('message');
        });
    })

    describe('Update', () => {
        it('should update a errands', async () => {
            const sut = makeSut();
            const dto = {
                id: 66,
                description: 'any description',
                detailing: 'any detail'
            };

            jest.spyOn(ErrandsService.prototype, 'update')
                .mockResolvedValue(dto);
            
            const request = {
                body: {
                    description: 'any description',
                    detailing: 'any detail'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const responseController = await sut.update(request, response);

            expect(responseController).toHaveProperty('id')
        })
    })
});

