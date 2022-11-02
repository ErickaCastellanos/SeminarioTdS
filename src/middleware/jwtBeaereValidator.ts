import { verify } from "@server/utils/jwt";

//Al momento en que llegue a la ruta que lo maneja pueda extraer cual es el usuario que está siendo seleccionado
export const jwtValidator = (req, res, next) =>{
  try{
    //Le devolvemos a la cadena codificada del token del login
    const jwtToken = (req.get("Authorization")||req.get("authorization")||"").replace("Bearer ", "");
    const decoded = verify(jwtToken)
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT_MIDDLEWARE:", err);
    res.status(403).json({error:"Invalid Token"});
  }
}