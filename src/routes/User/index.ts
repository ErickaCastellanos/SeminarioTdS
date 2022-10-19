/*import { Router } from "express";
import { IUser, User } from "@libs/User";

const router = Router();
const userInstance = new User();

//Obtener todos
router.get('/', async (_req, res)=> {
    try {
        res.json(await userInstance.getAllUsers());
    } catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
});

//Obtener por Id
router.get('/byindex/:index', async (req, res) => {
    try {
        const { index } = req.params;
        res.json(await userInstance.getUserByIndex(+index));
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al obtener Registro'});
    }
});

//Nuevo
router.post('/new', async (req, res) => {
    try {
        const newUser = req.body as unknown as IUser;
        const newUserIndex = await userInstance.addUser(newUser);
        res.json({newIndex: newUserIndex});
    } catch (error) {
        res.status(500).json({error: (error as Error).message}); 
    }
});

//Actualizar
//Los miembros que estan en un objeto y los que vienen los convierte en uno nuevo
router.put('/update/:index', async (req, res) =>{
    try {
        const { index } = req.params;
         //Del cuerpo sacamos los datos que van a convertirse en la estructura de user
        const userFromForm = req.body as IUser;
        //Fución de dos objetos, el objeto que tenemos de la colección con el objeto
        //que viene del form http
        await userInstance.updateUser(+index, userFromForm);
        res.status(200).json({"msg":"Datos Actualizados"});
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

//Eliminar
router.delete('/delete/:index', (req, res) => {
    try {
        const { index } = req.params as unknown as {index:number};
        if (userInstance.deleteUser(index)) {
            res.status(200).json({"msg": "Registro Eliminado"});
        }else {
            res.status(500).json({'msg': 'Error al eliminar Registro'});
        }
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
});

export default router;*/