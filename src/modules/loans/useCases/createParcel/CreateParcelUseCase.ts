import { inject, injectable } from 'tsyringe';

import { IParcelsRepository } from '../../repositories/IParcelsRepository';

interface IRequest {
  parcelValue: number;
  feesValue: number;
  payDate: string;
  payValue: number;
  valueWithFees: number;
  loan_id: string;
}

@injectable()
export class CreateParcelUseCase {
  constructor(
    @inject('ParcelsRepository')
    private parcelsRepository: IParcelsRepository
  ) {}

  async execute({
    feesValue,
    loan_id,
    parcelValue,
    payDate,
    payValue,
    valueWithFees,
  }: IRequest): Promise<void> {
    await this.parcelsRepository.create({
      parcelValue,
      feesValue,
      payDate,
      payValue,
      valueWithFees,
      loan_id,
    });
  }
}
