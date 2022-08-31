import { ICreateLoanDTO } from '../dtos/ICreateLoanDTO';
import { ICreateParcelsDTO } from '../dtos/ICreateParcelsDTO';
import { Loan } from '../infra/entities/Loan';

export interface ILoansRepository {
  create({
    parcelValue,
    value,
    uf,
    parcels,
    user_id,
    qntParcels,
    tax,
    totalPayValue,
    totalTax,
    id,
  }: ICreateLoanDTO): Promise<void>;
  find(user_id: string): Promise<Loan>;
  calcFees(uf: string): number;
  projectionParcels(
    value: number,
    tax: number,
    parcelValue: number
  ): ICreateParcelsDTO[];
  totalTaxValue(parcels: ICreateParcelsDTO[]): number;
  list(): Promise<Loan[]>;
}
