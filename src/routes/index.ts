import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

  //Vemos como entra Typescript, este es para consultar
  router.get('/view/:id', (req, res)=>{
    //Extraer datos de los parámetros
    const { id = -1 } = req.params as unknown as {id?:number};
    res.json({id});
  });

  //Enviar un formulario, post: crear un recurso
  /*En este caso el formulario viene de la información que está generada
  a partir de objetos json, en el body y todo viene en texto  */
  router.post('/new', (req, res)=>{
    //Declaro las variables para los datos que quiero obtener ya que se hará
    //una conversión de datos de typescript
    const { name = 'NO NAME', email = "", age = 0 } = req.body as {name?: String, email?: String, age?: number};
    
    //Devolvemos los datos obtenidos
    res.json({name, email, age});
  });

  //URL Parameters
  router.put('/update/:id', (req, res)=>{
    //Identificador
    const { id = -1 } = req.params as unknown as {id?:number};
    const { name = 'NO NAME', email = "", age = 0 } = req.body as {name?: String, email?: String, age?: number};
    res.json({ id, name, email, age});
    //Convierto a un numérico
  });

  //
  router.delete('/delete/:id', (req, res)=>{
    const { id = -1 } = req.params as unknown as {id?:number};
    res.json({id});
  });

export default router;
