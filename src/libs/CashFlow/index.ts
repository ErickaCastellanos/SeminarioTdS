//Interfaz
export interface ICashFlow{
    type: 'INCOME' | 'EXPENSE'; //Ingreso, dato
    date: Date;
    amount: number;
    description: string;
};

//Definición de clase, para manejar la lógica
export class CashFlow {
    //Manejo en memoria de un objeto
    private cashFlowItems : ICashFlow[] = [];

    //Elementos
    public addCashFlow(cashFlow:ICashFlow) : number {
        const cashFlowExist = this.cashFlowItems.findIndex(
            (obj) =>{
                return obj.amount === cashFlow.amount && obj.description === cashFlow.description;
            }
        );

        if(cashFlowExist < 0){
            this.cashFlowItems.push(cashFlow);
            return this.cashFlowItems.length -1;
        }
        throw Error('CashFlow Exists on Collection');
    }
}