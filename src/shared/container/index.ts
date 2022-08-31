import { container } from 'tsyringe';

import { ILoansRepository } from '../../modules/loans/repositories/ILoansRepository';
import { LoansRepository } from '../../modules/loans/repositories/implementations/LoansRepository';
import { ParcelRepository } from '../../modules/loans/repositories/implementations/ParcelsRepository';
import { UsersRepository } from '../../modules/loans/repositories/implementations/UsersRepository';
import { IParcelsRepository } from '../../modules/loans/repositories/IParcelsRepository';
import { IUsersRepository } from '../../modules/loans/repositories/IUsersRepository';

container.registerSingleton<ILoansRepository>(
  'LoansRepository',
  LoansRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IParcelsRepository>(
  'ParcelsRepository',
  ParcelRepository
);
