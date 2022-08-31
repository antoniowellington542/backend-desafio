import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSimulationUseCase } from './CreateSimulationUseCase';

export class CreateSimulationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { birthday, uf, cpf, parcelValue, value } = request.body;
    const createSimulationUseCase = container.resolve(CreateSimulationUseCase);

    const simulation = await createSimulationUseCase.execute({
      birthday,
      uf,
      cpf,
      parcelValue,
      value,
    });

    return response.status(200).json({
      message: 'simulado',
      simulation,
    });
  }
}
