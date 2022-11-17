import { URLSearchParams } from 'url';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

let LINKEDIN_TOKEN: `https://www.linkedin.com/oauth/v2/accessToken`;
let LINKEDIN_NAME: 'https://api.linkedin.com/v2/me';
let LINKEDIN_EMAIL: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';

const apiKeys = (process.env.LINKEDIN_API_KEY || '').split('|'); //split: toma la cadena completo y por medio del delimitador lo separa

//
const validateApiKey =(apikey:string) =>
{
    return apiKeys.includes(apikey);
}

export default validateApiKey;

const fetchJSON = (...args) => fetch(...args).then(r => r.json());

getValidatedWithLinkedinUser: async (code, redirectUri) => {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET
    })
    const { access_token } = await fetchJSON(LINKEDIN_TOKEN, {
      method: 'POST',
      body
    })
    const payload = {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` }
    }
    const { localizedFirstName, localizedLastName } = await fetchJSON(
      LINKEDIN_NAME,
      payload
    )
    const userData = {
      name: `${localizedFirstName} ${localizedLastName}`,
      email: ``
    }
    const response = await fetchJSON(LINKEDIN_EMAIL, payload)
    if (response.elements) {
      userData.email = response.elements[0]['handle~'].emailAddress
    } return userData
}

const generateAuthData = id => {
  const tokenExpirationTime =
    Math.floor(Date.now() / 1000) + process.env.JWT_LIFESPAN_IN_SECONDS
  return {
    token: jwt.sign({ id, exp: tokenExpirationTime }, process.env.SECRET),
    tokenExpirationTime
  }
}