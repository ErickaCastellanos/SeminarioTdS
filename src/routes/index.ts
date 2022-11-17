import {Request, Router } from 'express';
import CashFlowRouter from './CashFlow';
import UserLinkedin from './linkedinUser';
import UsersRouter from './User';
import apiKeyMW from '@middleware/apiKeyHeaderValidator';
import apiKeyLinkedin from '@middleware/linkedin';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';
import {passport} from 'passport-linkedin';
//import { LinkedInStrategy } from 'passport-linkedin'; 
const LinkedInStrategy = require('passport-linkedin').Strategy;

let LINKEDIN_TOKEN: `https://www.linkedin.com/oauth/v2/accessToken`;

const router = Router();


//http://localhost:3001/cashflow/byindex/1
router.use('/cashflow', apiKeyMW, jwtValidator, CashFlowRouter);
router.use('/security', apiKeyMW, UsersRouter);
router.use('/linkedin', UserLinkedin, apiKeyLinkedin);

passport.use(new LinkedInStrategy({
    consumerKey: process.env.LINKEDIN_API_KEY,
    consumerSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, done) {
    //UserLinkedin.get()
    token: LINKEDIN_TOKEN

    return done(null);
  }
));

export default router;

//Traera todo lo que le pedimos, any: cualquier cosa
export interface WithUserRequest extends Request {
    user?: any;
}