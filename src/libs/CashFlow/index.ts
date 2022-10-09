//Interfaz solo para saber comova a estar estructurado el objeto
//Para que pueda ser importada en otro archivo
//Este modelo se utu\ilizara para las bdd
/*import { getConnection } from "@models/sqlite/SqliteConn";
import { CashFlowDao } from "@models/sqlite/CashFlowDao";
export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: string;
};

//Definición de clase, para manejar la lógica
export class CashFlow {
    private dao: CashFlowDao;
    public constructor() {
        getConnection()
            .then(conn => {
                this.dao = new CashFlowDao(conn);
            })
            .catch(ex => console.error(ex));
    }

    /****************************************** CONSULTAS *****************************************

    //Obtener todos los elementos
    public getAllCashFlow() {
        //Contiene todos los elementos privados del CashFlow
        return this.dao.getClashFlows()
        //return this.cashFlowItems; // select * from cashflow;
    }

    //Obtener por id los elementos, pero debemos manejar los extremos validando
    //que si el index es mayor a cero devolvemos el CashFlow
    public getCashFlowByIndex(index: number){
        return this.dao.getClashFlowById({_id:index});
    }

    //Inserta en el arreglo clasflowitems va agregar el nuevo cashflow que
    //se le está mandando si ya no esxite internamente dentro de ese arreglo
    public addCashFlow(cashFlow: ICashFlow) {
        //Método pra encontrar el îndice de un objeto basåndose en ciertas características
        return this.dao.insertNewCashFlow(cashFlow);
    }

    //Actualizar, recibiendo un index y recibimos un CashFlow como tal, este CF devolverá un booleano
    public updateCashFlow( index:number, cashFlow:ICashFlow){
        //Se compara el actual con el que viene
        return this.dao.update({_id:index}, cashFlow);
    }

    //Eliminar el CashFlow, ocupamos un número y devolvemos verdadero o falso
    public deleteCashFlow(index: number) {
       return this.dao.deleteCashFlow({_id:index});
    }
}*/