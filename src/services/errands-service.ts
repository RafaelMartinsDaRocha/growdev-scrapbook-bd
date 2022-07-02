import { ErrandsRepository } from "../database/repositories";
import { ErrandsDTO } from "../dto/errands-dto";

export class ErrandsService {
    async find() {
        const repository = new ErrandsRepository();
        const errands = await repository.find();

        return errands.map(errand => {
            return {
                id: errand.id,
                description: errand.description,
                detailing: errand.detailing
            }
        });
    }

    async create(errandDTO: ErrandsDTO) {
        const repository = new ErrandsRepository();
        const errand = await repository.create(errandDTO);
        
        return {
            id: errand.id,
            description: errand.description,
            detailing: errand.detailing
        }
        // return errand;
    }

    async update(errandDTO: ErrandsDTO) {
        const repository = new ErrandsRepository();
        const errand = await repository.update(errandDTO);
        
        return {
            id: errand?.id,
            description: errand?.description,
            detailing: errand?.detailing
        }
    }

    async delete(id: number) {
        const repository = new ErrandsRepository();
        await repository.delete(id);
    }
}