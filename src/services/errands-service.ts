import { ErrandsRepository } from "../database/repositories";
import { ErrandsDTO } from "../dto/errands-dto";

export class ErrandsService {
    async find() {
        const repository = new ErrandsRepository();
        const errand = await repository.find();

        return errand;
    }

    async findOne(id: number) {
        const repository = new ErrandsRepository();
        
        const errand = await repository.findOne(id);

        return errand;
    }

    async create(errandDTO: ErrandsDTO) {
        const repository = new ErrandsRepository();
        const errand = await repository.create(errandDTO);

        return errand;
    }

    async update(errandDTO: ErrandsDTO) {
        const repository = new ErrandsRepository();
        const errand = await repository.update(errandDTO);

        return errand;
    }

    async delete(errandID: number) {
        const repository = new ErrandsRepository();
        await repository.delete(errandID);
    }
}