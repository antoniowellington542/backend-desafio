import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Loan } from './Loan';

@Entity('parcels')
export class Parcel {
  @PrimaryColumn()
  id?: string;

  @Column()
  loan_id: string;

  @Column()
  payValue: number;

  @Column()
  feesValue: number;

  @Column()
  valueWithFees: number;

  @Column()
  parcelValue: number;

  @Column()
  payDate: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
