import {Router} from 'express';
import { ICashFlow, CashFlow } from '@libs/CashFlow';

const router = Router();
const cashFlowInstance = new CashFlow();

//Obtener todos
router.get('/', async (_req, res)=>{
  try {
    res.json(await cashFlowInstance.getAllCashFlow());
  } catch (ex) {
    console.error(ex);
    res.status(503).json({error:ex});
  }
});

//Obtener por id
router.get('/byindex/:index', async (req, res) => {
  try {
    //El index viene del objeto params
    const { index } = req.params;
    res.json(await cashFlowInstance.getCashFlowByIndex(+index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'});
  }
});

//Nuevo
router.post('/new', async (req, res)=>{
  try {
    const newCashFlow = req.body as unknown as ICashFlow;
    const newCashFlowIndex = await cashFlowInstance.addCashFlow(newCashFlow);
    res.json({newIndex: newCashFlowIndex});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

//Los miembros que estan en un objeto y los que vienen los convierte en uno nuevo
router.put('/update/:index', async (req, res)=>{
  try {
    const { index } = req.params;
    //Del cuerpo sacamos los datos que van a convertirse en la estructura de CashFlow
    const cashFlowFromForm = req.body as ICashFlow;
    //Fución de dos objetos, el objeto que tenemos de la colección con el objeto
    //que viene del form http
    await cashFlowInstance.updateCashFlow(+index, cashFlowFromForm);
    res.status(200).json({"msg":"Registro Actualizado"});
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
  // const cashFlowUpdate = {...cashFlowInstance.getCashFlowByIndex(index), ...cashFlowFromForm}; forma de hacerlo
});


router.delete('/delete/:index', (req, res)=>{
  try {
    const { index } = req.params as unknown as {index:number};
    if (cashFlowInstance.deleteCashFlow(index)) {
      res.status(200).json({"msg": "Registro Eliminado"});
    } else {
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al eliminar Registro'});
  }
});

//Lo sacamos para poder
export default router;