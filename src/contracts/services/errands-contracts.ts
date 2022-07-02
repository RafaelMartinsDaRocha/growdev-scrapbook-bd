import { ErrandsEntity } from '../../database/entities';
import { ErrandsDTO } from '../../dto';

export interface ErrandsServiceInterface {
    find(): Promise<ErrandsDTO[] | undefined>
    create(errandDTO: ErrandsDTO): Promise<ErrandsDTO>
    update(errandDTO: ErrandsDTO): Promise<{
        id: number | undefined;
        description: string | undefined;
        detailing: string | undefined;
    }>
    delete(id: number): Promise<void>
}