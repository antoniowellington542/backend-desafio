import { ICreateParcelsDTO } from '../dtos/ICreateParcelsDTO';
import { Parcel } from '../infra/entities/Parcel';

export interface IParcelsRepository {
  create({
    parcelValue,
    payDate,
    payValue,
    feesValue,
    valueWithFees,
    loan_id,
  }: ICreateParcelsDTO): Promise<void>;
  find(loan_id: string): Promise<Parcel[]>;
}
