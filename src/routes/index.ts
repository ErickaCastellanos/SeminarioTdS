import { Router } from 'express';

import CashFlowRouter from './CashFlow';
//import UserRouter from './User';
import apiKeyMW from '@middleware/apiKeyHeaderValidator';

const router = Router();

//http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', apiKeyMW, CashFlowRouter);
//router.use('/user', UserRouter);

export default router;