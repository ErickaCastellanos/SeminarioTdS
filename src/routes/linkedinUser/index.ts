import express from 'express';
const router = express.Router();
import { UsersLinkedin } from '@libs/linkedinUser';

const users = new UsersLinkedin();
router.post('/signin', async (req, res) => {
    try {
        //
        const { name, email, _token, _tokenExpirationTime, _firstIdentification} = req.body;
        const result = await users.signin(name, email, _token, _tokenExpirationTime, _firstIdentification);
        console.log("SIGNIN:", result);
        res.status(200).json({ "msg": "Usuario Creado Correctamente" });
    } catch (ex) {
        console.log("Error:", ex);
        res.status(500).json({ error: "Error al crear usuario" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await users.login(email);
        console.log("LOGIN:", result);
        res.status(200).json({ "msg": "Hola, bienvenido a tu cuenta :)" });
        res.status(200).json(result);
    } catch (ex) {
        console.log("Error:", ex);
        res.status(403).json({ error: "Las credenciales no son válidas" });
    }
});


export default router;