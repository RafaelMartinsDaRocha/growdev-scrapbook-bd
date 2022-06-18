import { ErrandsEntity } from '../../database/entities';
import { ErrandsDTO } from '../../dto';

export interface ErrandsServiceInterface {
    find(): Promise<ErrandsEntity[]>
    create(errandDTO: ErrandsDTO): Promise<ErrandsEntity>
    update(errandDTO: ErrandsDTO): Promise<ErrandsEntity | undefined>
    delete(id: number): Promise<void>
}