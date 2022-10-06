import { ICashFlow } from "../entities/CashFlow" ;
import { AbstractDao } from "./AbstractDao";

//Definimos el tipo de datos que va a utilizar
export class CashFlowDao extends AbstractDao<ICashFlow> {
    //Metodo
    public async getCashFlows() {
        //La palabra clave super hace referencia a la clase heredada
        super.findAll()
    }

    /** */
    public async insertNewCashFlow( newCashFlow: ICashFlow) {
        try {
            //Damos la responsabilidad al driver de conectarse a la BDD y grabarlo
            const result = await super.createOne(newCashFlow);
            return result;
        }catch( ex: unknown) {
            console.log("CashFlow sqlite: ", (ex as Error).message);
            throw ex;
        }
        
    }
}