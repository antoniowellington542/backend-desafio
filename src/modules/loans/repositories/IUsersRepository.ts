import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/entities/User';

export interface IUsersRepository {
  create({ birthday, cpf }: ICreateUserDTO): Promise<void>;
  find(cpf: string): Promise<User>;
}
