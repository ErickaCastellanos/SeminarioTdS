import {Router} from 'express';
import { ICashFlow, CashFlow } from '@libs/CashFlow';

const router = Router();
const cashFlowInstance = new CashFlow();

//Obtener todos
router.get('/', async (_req, res)=>{
  try{
    res.json(await cashFlowInstance.getAllCashFlow());
  }catch(ex){
    console.error(ex);
    res.status(503).json({error:ex});
  }
  
});

//Obtener por id
router.get('/byindex/:index', (req, res) => {
  try {
    //El index viene del objeto params
    const { index } = req.params as unknown as {index:number};
    res.json(cashFlowInstance.getCashFlowByIndex(index));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({'msg': 'Error al obtener Registro'}); //Msj sino encontró el registro
  }
});

//Nuevo
router.post('/new', (req, res)=>{
  try {
    const newCashFlow = req.body as unknown as ICashFlow;
    const newCashFlowIndex = cashFlowInstance.addCashFlow(newCashFlow);
    res.json({newIndex: newCashFlowIndex});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
});

//Los miembros que estan en un objeto y los que vienen los convierte en uno nuevo
router.put('/update/:index', (req, res)=>{
  try {
    const { index = -1} = req.params as unknown as {index?:number};
    //Del cuerpo sacamos los datos que van a convertirse en la estructura de CashFlow
    const cashFlowFromForm = req.body as ICashFlow;
    //Fución de dos objetos, el objeto que tenemos de la colección con el objeto
    //que viene del form http
    const cashFlowUpdate = Object.assign(
      cashFlowInstance.getCashFlowByIndex(index), cashFlowFromForm
    );
    // const cashFlowUpdate = {...cashFlowInstance.getCashFlowByIndex(index), ...cashFlowFromForm}; forma de hacerlo
    if (cashFlowInstance.updateCashFlow(index, cashFlowUpdate)){
      res.json(cashFlowUpdate)
    } else {
      res.status(404).json({"msg":"Update not posible"});
    }
  } catch(error) {
    res.status(500).json({error: (error as Error).message});
  }
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