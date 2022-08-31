import { Router } from 'express';

import { loanRoutes } from './loans.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use('/loan', loanRoutes);
router.use('/user', userRoutes);

export { router };
