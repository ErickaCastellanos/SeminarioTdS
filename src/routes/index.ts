import { Router } from 'express';

import CashFlowRouter from './CashFlow';
import UserRouter from './User';

const router = Router();

//http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', CashFlowRouter);
router.use('/user', UserRouter);

export default router;