import { Router } from 'express';

import { CreateUserController } from '../../../../modules/loans/useCases/createUser/CreateUserController';
import { FindUserController } from '../../../../modules/loans/useCases/findUser/FindUserController';

const userRoutes = Router();

const findUserController = new FindUserController();
const createUserController = new CreateUserController();

userRoutes.post('/create', createUserController.handle);
userRoutes.get('/find/:cpf', findUserController.handle);

export { userRoutes };
