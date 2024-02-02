import { AddressEntity } from '../../../modules/address/entities/address.entity';
import { StateEntity } from '../../../modules/state/entities/state.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'state_id' })
  stateId: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => AddressEntity, (addresses) => addresses.city)
  addresses?: AddressEntity[];

  @ManyToOne(() => StateEntity, (state) => state.city)
  @JoinColumn({ name: 'state_id' })
  state?: StateEntity;
}
