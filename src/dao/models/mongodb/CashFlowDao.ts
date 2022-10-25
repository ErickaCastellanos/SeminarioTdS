import { ICashFlow } from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao"; 
//Importa la conexión y la base de datos
import {Db} from "mongodb";

export class CashFlowDao extends AbstractDao<ICashFlow> {
  //
  public constructor(db: Db) {
    super('cashflow', db );
  }

  public getClashFlows() {
    return super.findAll()
  }

  public async getClashFlowById( identifier : string ){
    try{
      const result = await super.findByID(identifier);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async insertNewCashFlow( newCashFlow: ICashFlow) {
    try {
      //Lo destructuramos y vamos a hacer que devuelva un objeto como tal
      const {_id, ...newObject} = newCashFlow;
      const result = await super.createOne(newObject);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async updateCashFlow( updateCashFlow: ICashFlow) {
    try {
      //
      const {_id, ...updateObject} = updateCashFlow;
      //Convertimos el id en string para typescript
      const result = await super.update(_id as string, updateObject); //
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  //Extraer los documentos sin la información como tal
  public async getCountCashFlow() {
    try {
      return await super.getCollection().countDocuments({});
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }

  public async deleteCashFlow( deleteCashFlow: Partial<ICashFlow>) {
    try {
      const {_id } = deleteCashFlow;
      const result = await super.delete(_id as string);
      return result;
    } catch( ex: unknown) {
      console.log("CashFlowDao mongodb:", (ex as Error).message);
      throw ex;
    }
  }
}