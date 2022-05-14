import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'errands' })
export class ErrandsEntity extends BaseEntity {
    @PrimaryColumn()
    id?: number;

    @Column()
    description: string;

    @Column()
        detailing: string;
    
    constructor(description: string, detailing: string) {
        super();
        this.description = description;
        this.detailing = detailing
    }
}
