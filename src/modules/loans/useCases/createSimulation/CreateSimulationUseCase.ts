import { inject, injectable } from 'tsyringe';

import { IDataResponseDTO } from '../../dtos/IDataResponseDTO';
import { ILoansRepository } from '../../repositories/ILoansRepository';

interface IRequest {
  cpf: string;
  birthday: string;
  uf: string;
  value: number;
  parcelValue: number;
}

@injectable()
export class CreateSimulationUseCase {
  constructor(
    @inject('LoansRepository')
    private loansRepository: ILoansRepository
  ) {}

  async execute({
    cpf,
    birthday,
    uf,
    value,
    parcelValue,
  }: IRequest): Promise<IDataResponseDTO> {
    const tax = this.loansRepository.calcFees(uf);
    const parcels = this.loansRepository.projectionParcels(
      value,
      tax,
      parcelValue
    );

    const totalTax = this.loansRepository.totalTaxValue(parcels);
    const totalPayValue = value + totalTax;
    const qntParcels = parcels.length;

    const data: IDataResponseDTO = {
      cpf,
      birthday,
      value,
      uf,
      tax,
      parcelValue,
      qntParcels,
      totalTax,
      totalPayValue,
      parcels,
    };

    return data;
  }
}
