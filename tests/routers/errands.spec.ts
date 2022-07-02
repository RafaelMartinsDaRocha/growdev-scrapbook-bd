import Application from '../../src/app';
import request from 'supertest';
import { ErrandsService } from '../../src/services';
import { createConnection } from 'typeorm';

jest.mock('../../src/services/errands-service.ts');

describe('Errands Router', () => {
    const application = new Application();
    application.init();

    beforeAll(async () => {
        await createConnection()
        jest.resetAllMocks();
    })

    describe('GET / errands', () => {
        it('should return 200...', async () => {
            const dto = [{
                id: 71,
                description: 'any desc',
                detailing: 'any det'
            }]

            jest.spyOn(ErrandsService.prototype, 'find').mockResolvedValue(dto)
            
            await request(application.server).post('/errands').send({
                description: 'any desc',
                detailing: 'any det'
            }).expect(200)
        })

    })

    describe('POST / errands', () => {
        it('should return 200...', async () => {
            const dto = {
                id: 1,
                description: 'any desc',
                detailing: 'any det'
            }

            jest.spyOn(ErrandsService.prototype, 'create').mockResolvedValue(dto)

            await request(application.server).post('/errands').send({
                description: 'any desc',
                detailing: 'any det'
            }).expect(200)
        })

        it('should return 400...', async () => {
            await request(application.server).post('/errands').send({
                description: '',
                detailing: ''
            }).expect(400)
        })

        it('should returns 400..', async () =>{
            await request(application.server).post('/errands').send({
                description: 'ab',
                detailing: 'cd'
            }).expect(400)
        })
    })

    describe('PUT / errands /:id', () => {
        it('should return 200...', async () => {
            const dto = {
                id: 71,
                description: 'any desc',
                detailing: 'any det'
            }

            jest.spyOn(ErrandsService.prototype, 'update').mockResolvedValue(dto)

            await request(application.server).put(`/errands/${dto.id}`).send({
                description: 'any desc',
                detailing: 'any det'
            }).expect(200)
        })
    })

    describe('DELETE / errands / :id', () => {
        it('should return 204...', async () => {
            
            await request(application.server).delete(`/errands/${71}`).expect(204)
        })
    })
})