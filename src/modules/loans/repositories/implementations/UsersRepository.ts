import { Repository } from 'typeorm';

import AppDataSource from '../../../../shared/infra/typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }
  async create({ birthday, cpf }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      cpf,
      birthday,
    });

    await this.repository.save(user);
  }
  async find(cpf: string): Promise<User> {
    const user = await this.repository.findOne({ where: { cpf } });
    return user;
  }
}
