//Interfaz solo para saber comova a estar estructurado el objeto
//Para que pueda ser importada en otro archivo
//Este modelo se utu\ilizara para las bdd
import { getConnection as getSQLiteConn } from "@models/sqlite/SqliteConn";
import { getConnection as getMongoDBConn } from "@models/mongodb/MongoDBConn";
import { CashFlowDao as CashFlowSqLiteDao } from "@models/sqlite/CashFlowDao";
import { CashFlowDao as CashFlowMongoDbDao } from "@models/mongodb/CashFlowDao";
export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: string;
};

//Definición de clase, para manejar la lógica
export class CashFlow {
    private dao: CashFlowSqLiteDao|CashFlowMongoDbDao;
    public constructor(typeConn: "SQLITE"|"MONGODB"){
      const getConnection = typeConn === "SQLITE" ? getSQLiteConn : getMongoDBConn;
      const CashFlowDao =  typeConn === "SQLITE" ? CashFlowSqLiteDao : CashFlowMongoDbDao;
      getConnection()
        .then(conn=>{
          this.dao = new CashFlowDao(conn);
        })
        .catch(ex=>console.error(ex));
    }

    /****************************************** CONSULTAS *****************************************/

    //Obtener todos los elementos
    public getAllCashFlow() {
        return this.dao.getClashFlows()
    }

    //Obtener por id los elementos, pero debemos manejar los extremos validando
    //que si el index es mayor a cero devolvemos el usuario
    public getCashFlowByIndex(index: number | string) {
        if (typeof index === "string") {
            return (this.dao as CashFlowMongoDbDao).getClashFlowById(index as string);
        } else {
            return (this.dao as CashFlowSqLiteDao).getClashFlowById({ _id: index as number });
        }
    }

    //
    public getCountCashflow() {
        return (this.dao instanceof CashFlowMongoDbDao) ?
        (this.dao as CashFlowMongoDbDao).getCountCashFlow() :
        Promise.resolve(0);
    }

    //Inserta en el arreglo clasflowitems va agregar el nuevo cashflow que
    //se le está mandando si ya no esxite internamente dentro de ese arreglo
    public addCashFlow(cashFlow: ICashFlow) {
        return this.dao.insertNewCashFlow(cashFlow);
    }

    //
    public updateCashFlow(index: number | string, cashFlow: ICashFlow) {
        return (this.dao as CashFlowMongoDbDao).updateCashFlow({ ...cashFlow, _id: index });
    }

    //
    public deleteCashFlow(index: number | string) {
        if (typeof index === "string") {
            return (this.dao as CashFlowMongoDbDao).deleteCashFlow({ _id: index as string });
        } else {
            return (this.dao as CashFlowSqLiteDao).deleteCashFlow({ _id: index as number });
        }
    }
}