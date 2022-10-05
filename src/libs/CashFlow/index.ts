//Interfaz solo para saber comova a estar estructurado el objeto
export interface ICashFlow{
    type: 'INCOME' | 'EXPENSE'; //Ingreso, Gasto
    date: Date;
    amount: number;
    description: string;
};

//Definición de clase, para manejar la lógica
export class CashFlow {
    //Manejo en memoria de un objeto
    private cashFlowItems : ICashFlow[] = [];

    //Elementos

    public getAllCashFlow(): ICashFlow[] {
        return this.cashFlowItems; // select * from cashflow;
    }
    
    public getCashFlowByIndex( index:number): ICashFlow {
        if (index >= 0 && index < this.cashFlowItems.length) {
          return this.cashFlowItems[index];
        }
        throw Error('Index out of range');
    }

    //Inserta en el arreglo clasflowitems va agregar el nuevo cashflow que
    //se le está mandando si ya no esxite internamente dentro de ese arreglo
    public addCashFlow(cashFlow:ICashFlow) : number {
        //Método pra encontrar el îndice de un objeto basåndose en ciertas características
        const cashFlowExist = this.cashFlowItems.findIndex(
            (obj) =>{
                //Si fineindex no lo encunetra va a devolver -1
                return obj.amount === cashFlow.amount && obj.description === cashFlow.description;
            }
        );
        
        //
        if(cashFlowExist < 0){
            this.cashFlowItems.push(cashFlow);
            return this.cashFlowItems.length -1;
            // [{},{},{},{}]
            // 0   1   2   3
            // 4 - 1 = 3
        }
        //
        throw Error('CashFlow Exists on Collection');
    }

    public updateCashFlow( index:number, cashFlow:ICashFlow): boolean {
        if (index >= 0 && index < this.cashFlowItems.length) {
          this.cashFlowItems[index] = cashFlow;
          return true;
        }
        return false;
    }
    
    public deleteCashFlow( index:number): boolean {
    if ( index >= 0 && index < this.cashFlowItems.length ) {
        this.cashFlowItems = this.cashFlowItems.filter(
        (_obj: ICashFlow, i:number)=> i !== index
        );
        return true;
    }
    return false;
    }
}