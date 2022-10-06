//Interfaz solo para saber comova a estar estructurado el objeto
//Para que pueda ser importada en otro archivo
//Este modelo se utu\ilizara para las bdd
import { getConnection } from "@models/sqlite/SqliteConn";
import { CashFlowDao } from "@models/sqlite/CashFlowDao";
export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE'; //Ingreso, Gasto
    date: Date;
    amount: number;
    description: string;
};

//Definición de clase, para manejar la lógica
export class CashFlow {
    private dao: CashFlowDao;
    public constructor() {
        getConnection()
        .then(conn=>{
            this.dao = new CashFlowDao(conn);
        })
        .catch(ex=>console.error(ex));
    }
    //Manejo en memoria de un objeto
    private cashFlowItems: ICashFlow[] = [];

    /****************************************** CONSULTAS ******************************************/

    //Obtener todos los elementos
    public getAllCashFlow(){
        //Contiene todos los elementos privados del CashFlow
        return this.dao.getClashFlows()
        //return this.cashFlowItems; // select * from cashflow;
    }

    //Obtener por id los elementos, pero debemos manejar los extremos validando
    //que si el index es mayor a cero devolvemos el CashFlow
    public getCashFlowByIndex(index: number): ICashFlow {
        if (index >= 0 && index < this.cashFlowItems.length) {
            return this.cashFlowItems[index];
        }
        throw Error('Index out of range');//Devulevo algo que no existe
    }

    //Inserta en el arreglo clasflowitems va agregar el nuevo cashflow que
    //se le está mandando si ya no esxite internamente dentro de ese arreglo
    public addCashFlow(cashFlow: ICashFlow): number {
        //Método pra encontrar el îndice de un objeto basåndose en ciertas características
        const cashFlowExist = this.cashFlowItems.findIndex(
            (obj) => {
                //Si fineindex no lo encunetra va a devolver -1
                return obj.amount === cashFlow.amount && obj.description === cashFlow.description;
            }
        );

        //
        if (cashFlowExist < 0) {
            this.cashFlowItems.push(cashFlow);
            return this.cashFlowItems.length - 1; //Devolvemos el último índice
            // [{},{},{},{}]: Cuando se corre este arreglo se agrega uno más
            // 0   1   2   3
            // 4 - 1 = 3
        }
        //
        throw Error('CashFlow Exists on Collection');
    }

    //Actualizar, recibiendo un index y recibimos un CashFlow como tal, este CF devolverá un booleano
    public updateCashFlow(index: number, cashFlow: ICashFlow): boolean {
        //Se compara el actual con el que viene
        if (index >= 0 && index < this.cashFlowItems.length) {
            this.cashFlowItems[index] = cashFlow;
            return true;
        }
        return false;
    }

    //Eliminar el CashFlow, ocupamos un número y devolvemos verdadero o falso
    public deleteCashFlow(index: number): boolean {
        if (index >= 0 && index < this.cashFlowItems.length) {
            //Realizamos una sustitución
            this.cashFlowItems = this.cashFlowItems.filter(
                //Método que recibe verdadero o falso
                (_obj: ICashFlow, i: number) => i !== index
            );
            return true;
        }
        return false;
    }
}