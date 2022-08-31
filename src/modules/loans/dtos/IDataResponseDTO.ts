import { ICreateParcelsDTO } from './ICreateParcelsDTO';

export interface IDataResponseDTO {
  cpf: string;
  birthday: string;
  value: number;
  tax: number;
  uf: string;
  parcelValue: number;
  qntParcels: number;
  totalTax: number;
  totalPayValue: number;
  parcels: ICreateParcelsDTO[];
}
