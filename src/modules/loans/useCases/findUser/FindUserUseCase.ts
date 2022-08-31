import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../infra/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class FindUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(cpf: string): Promise<User> {
    const user = await this.usersRepository.find(cpf);

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}
