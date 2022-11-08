//Interfaz solo para saber comova a estar estructurado el objeto
//Para que pueda ser importada en otro archivo
//Este modelo se utilizara para las bdd
import { getConnection as getMongoDBConn } from "@models/mongodb/MongoDBConn";
import { CashFlowDao as CashFlowMongoDbDao } from "@models/mongodb/CashFlowDao";
export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: string;
};

//Definición de clase, para manejar la lógica
export class CashFlow {
    private dao: CashFlowMongoDbDao;
    public constructor() {
        const getConnection = getMongoDBConn;
        const CashFlowDao = CashFlowMongoDbDao;
        getConnection()
            .then(conn => {
                this.dao = new CashFlowDao(conn);
            })
            .catch(ex => console.error(ex));
    }

    /****************************************** CONSULTAS *****************************************/

    //Obtener todos los elementos
    public getAllCashFlow() {
        return this.dao.getClashFlows()
    }

    public getAllCashFlowFromUser(id: string) {
        return this.dao.getCashFlowByUser(id);
    }

    //Obtener por id los elementos, pero debemos manejar los extremos validando
    //que si el index es mayor a cero devolvemos el usuario
    public getCashFlowByIndex(index: string) {
        return this.dao.getClashFlowById(index);
    }

    //Obtener registros por usuario
    public getCashFlowByUserPaged(userId: string, page: number, items: number) {
        return this.dao.getCashFlowByUserPaged(userId, page, items);
    }

    //Comparando si el dao es de tipo dao y lo convertimos porque solo mnogodb está
    //trabajando sino es de mongodb devuelve 0
    public getCountCashflow(userId: string) {
        return this.dao.getCountCashFlow(userId);
    }

    //
    public getTypeSumary(userId: string) {
        return this.dao.getTypeSumarry(userId);
    }

    //Inserta en el arreglo clasflowitems va agregar el nuevo cashflow que
    //se le está mandando si ya no esxite internamente dentro de ese arreglo
    public addCashFlow(cashFlow: ICashFlow, userId: string) {
        const { type, date, amount, description } = cashFlow;
        //Mandar los correspondientes datos para convertirlos a sus elementos concretos
        return this.dao.insertNewCashFlow(
            {
                type,
                date: new Date(date),
                amount: Number(amount),
                description
            }, userId
        );
    }

    //
    public updateCashFlow(index: number | string, cashFlow: ICashFlow) {
        return (this.dao as CashFlowMongoDbDao).updateCashFlow({ ...cashFlow, _id: index });
    }

    //
    public deleteCashFlow(index: string) {
        return this.dao.deleteCashFlow({ _id: index })
    }
}