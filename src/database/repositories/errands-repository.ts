import { ErrandsEntity } from "../entities";
import { ErrandsDTO } from "../../dto/errands-dto";

export class ErrandsRepository {
    async find() {
        const errands = await ErrandsEntity.find()

        return errands;
    }
     async findOne(id: number) {
         const errand = await ErrandsEntity.findOne(id);

         return errand;
     }

     async create(errandDTO: ErrandsDTO) {
         const errand = await new ErrandsEntity(errandDTO.description, errandDTO.detailing);

         errand.save;

         return errand;
     }

     async update(errandDTO: ErrandsDTO) {
         const errand = await new ErrandsEntity(errandDTO.description, errandDTO.detailing);

         if (errand) {
             errand.description = errandDTO.description;
             errand.detailing = errandDTO.detailing
         }

         return errand;
     }

     async delete(errandID: number) {
         await ErrandsEntity.delete(errandID);
     }
}