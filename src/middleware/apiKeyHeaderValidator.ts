//Esta es una función
import validateApiKey from "@server/utils/apiKeyValidator";

const apiKeyMW = (req, res, next)=>{
   const apikey =  req.get('apikey') || ''; 
   if (validateApiKey(apikey)) {
        next();// pase al siguiente paso
   }

   return res.status(406).json({"error":"APIKEY Not valid!"});
}

export default apiKeyMW;