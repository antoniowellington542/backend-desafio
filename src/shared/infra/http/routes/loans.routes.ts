import { Router } from 'express';

import { CreateLoanController } from '../../../../modules/loans/useCases/createLoan/CreateLoanController';
import { CreateSimulationController } from '../../../../modules/loans/useCases/createSimulation/CreateSimulationController';
import { FindLoanController } from '../../../../modules/loans/useCases/findLoan/FindLoanController';
import { ListLoanController } from '../../../../modules/loans/useCases/listLoan/ListLoanController';

const loanRoutes = Router();

const createLoanController = new CreateLoanController();
const createSimulationController = new CreateSimulationController();
const findLoanController = new FindLoanController();
const listLoanController = new ListLoanController();

loanRoutes.post('/create', createLoanController.handle);
loanRoutes.post('/simulate', createSimulationController.handle);
loanRoutes.get('/find/:id', findLoanController.handle);
loanRoutes.get('/list', listLoanController.handle);
export { loanRoutes };
