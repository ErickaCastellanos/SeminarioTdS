import {Request, Router } from 'express';

import CashFlowRouter from './CashFlow';
import UsersRouter from './User';
import apiKeyMW from '@middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';

const router = Router();

//http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', apiKeyMW, jwtValidator, CashFlowRouter);
router.use('/security', apiKeyMW, UsersRouter);

export default router;

//Traera todo lo que le pedimos, cualquier cosa
export interface WithUserRequest extends Request {
    user?: any;
}