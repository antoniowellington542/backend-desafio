import { Parcel } from '../infra/entities/Parcel';

export interface ICreateLoanDTO {
  uf: string;
  value: number;
  parcelValue: number;
  parcels?: Parcel[];
  user_id: string;
  id?: string;
  tax: number;
  totalPayValue: number;
  totalTax: number;
  qntParcels: number;
}
