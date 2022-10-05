import { ICashFlow, CashFlow } from './index';

describe('CashFlow Lib Unit Test', () => {
    //Recibe una función, it es lo que vamos a querer probar
    it('should Create an Instace of CashFlow', () => {
        //Es donde lo vamos a crear
        const cashFlowInstance = new CashFlow();
        expect(cashFlowInstance).toBeDefined();//Necesito saber si está definido
    });

    //Probar si puedo agregar elementos
    it('should Add a new CashFlow Item', () => {
        const cashFlowInstance = new CashFlow();
        const cashFlowItem: ICashFlow = {
            type: 'INCOME',
            date: new Date(),
            amount: 100,
            description: 'Receipt A101 from SW'
        };

        //Espero que me lo agregue y me va a retornar en 0 ya que 1 es el
        //indice y 0 es el elemento
        const index = cashFlowInstance.addCashFlow(cashFlowItem);
        expect(index).toBe(0); //
    });
});