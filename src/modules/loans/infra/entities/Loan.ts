import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Parcel } from './Parcel';

@Entity('loans')
export class Loan {
  @PrimaryColumn()
  id?: string;

  @Column()
  user_id: string;

  @Column()
  uf: string;

  @Column()
  value: number;

  @Column()
  parcelValue: number;

  parcels?: Parcel[];

  @Column()
  tax: number;

  @Column()
  totalPayValue: number;

  @Column()
  totalTax: number;

  @Column()
  qntParcels: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
