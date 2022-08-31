import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  cpf: string;
  birthday: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ cpf, birthday }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.find(cpf);

    if (userAlreadyExists) {
      throw new AppError('User Already Exists!');
    }

    await this.usersRepository.create({ cpf, birthday });
  }
}
