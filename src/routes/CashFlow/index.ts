import { Router } from 'express';
import { ICashFlow, CashFlow } from '@libs/CashFlow';
import { commonValidator, validateInput } from '@server/utils/validator';
import { WithUserRequest } from '@routes/index';
const router = Router();
const cashFlowInstance = new CashFlow();

//Tenemos que extender ese
router.get('/', async (req: WithUserRequest, res) => {
  try {
    //Si tiene esa informacion la va a extraer
    const { page, items } = { page: "1", items: "10", ...req.query };
    console.log("CASHFLOW", req.user);
    res.json(await cashFlowInstance.getCashFlowByUserPaged(req.user?._id, Number(page), Number(items)));
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

//
router.get('/summary', async (req: WithUserRequest, res) => {
  try {
    res.json(await cashFlowInstance.getTypeSumary(req.user._id));
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

//
router.get('/count', async (req: WithUserRequest, res) => {
  try {
    res.json({ "count": await cashFlowInstance.getCountCashflow(req.user._id) });
  } catch (ex) {
    console.error(ex);
    res.status(503).json({ error: ex });
  }
});

//Obtener por id
router.get('/byindex/:index', async (req, res) => {
  try {
    const { index: id } = req.params;
    res.json(await cashFlowInstance.getCashFlowByIndex(id));
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ 'msg': 'Error al obtener Registro' });
  }
});


router.post('/testvalidator', async (req, res) => {
  const { email } = req.body;
  const validateEmailSchema = commonValidator.email;
  validateEmailSchema.param = "email";
  validateEmailSchema.required = true;
  validateEmailSchema.customValidate = (values) => { return values.includes('unicah.edu'); }
  const errors = validateInput({ email }, [validateEmailSchema]);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  return res.json({ email });
});

//
router.post('/new', async (req: WithUserRequest, res) => {
  try {
    const { _id: userId } = req.user;
    const newCashFlow = req.body as unknown as ICashFlow;
    //VALIDATE

    //No lo colocamos directamente dentro del ICashFlow porque tendría que colocarlo
    //primeramente en un objectId,entonces lo pasamos aquí directamente
    const newCashFlowIndex = await cashFlowInstance.addCashFlow(newCashFlow, userId);
    res.json({ newIndex: newCashFlowIndex });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//Los miembros que estan en un objeto y los que vienen los convierte en uno nuevo
router.put('/update/:index', async (req, res) => {
  try {
    const { index } = req.params;
    const cashFlowFromForm = req.body as ICashFlow;
    const id = (/^\d*$/.test(index)) ? +index : index;
    await cashFlowInstance.updateCashFlow(id, cashFlowFromForm);
    res.status(200).json({ "msg": "Registro Actualizado" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//
router.delete('/delete/:index', (req, res) => {
  try {
    const { index: id } = req.params;
    if (cashFlowInstance.deleteCashFlow(id)) {
      res.status(200).json({ "msg": "Registro Eliminado" });
    } else {
      res.status(500).json({ 'msg': 'Error al eliminar Registro' });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ 'msg': 'Error al eliminar Registro' });
  }
});

//Lo sacamos para poder
export default router;