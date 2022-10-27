//Voy a recibir un texto y lo voy a comparar con las variables de ambiente
//ME DEVUELVE UNA ESTRUCTURA
const apiKeys = (process.env.API_KEYS || '').split('|'); //split: toma la cadena completo y por medio del delimitador lo separa

//
const validateApiKey =(apikey:string) =>
{
    return apiKeys.includes(apikey);
}

export default validateApiKey;