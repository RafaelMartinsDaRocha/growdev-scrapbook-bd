import { ErrandsEntity } from "../entities";
import { ErrandsDTO } from "../../dto/errands-dto";

export class ErrandsRepository {
    async find() {
        const errands = await ErrandsEntity.find()

        return errands;
    }
    
     async create(errandDTO: ErrandsDTO) {
         const errand = await new ErrandsEntity(errandDTO.description, errandDTO.detailing);

         errand.save();

         return errand;
     }

     async update(errandDTO: ErrandsDTO) {
         const errand = await ErrandsEntity.findOne(errandDTO.id);

         if (errand) {
             errand.description = errandDTO.description;
             errand.detailing = errandDTO.detailing;
             await errand.save();
         }

         return errand;
     }

     async delete(id: number) {
         await ErrandsEntity.delete(id);
     }
}