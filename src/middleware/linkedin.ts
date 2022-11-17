import validateApiKey from "@server/utils/auth";
import express from "express";
import passport from "passport";

const app = express();

const apiKeyLinkedin = (req, res, next)=>{
   const apikey = req.get('apikey') || ''; 
   if (validateApiKey(apikey)) {
      return next();// pase al siguiente paso
   }

   return res.status(406).json({"error":"APIKEY Not valid!"});
}

app.get('/auth/linkedin',
  passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({ "msg": "Hola, bienvenido a tu cuenta :)" });
    res.redirect('/');
  });

export default apiKeyLinkedin;