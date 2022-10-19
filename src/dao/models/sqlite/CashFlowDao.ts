import { ICashFlow } from "../entities/CashFlow";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

//Definimos el tipo de datos que va a utilizar
export class CashFlowDao extends AbstractDao<ICashFlow> {
    public constructor(db: sqlite.Database) {
        //Vamos a esperrar que nos inyecte la bdd y accede y utiliza todos los elementos
        super('CASHFLOW', db as sqlite.Database);
        //Creo la BDD que voy a ocupar
        super.exec('CREATE TABLE IF NOT EXISTS CASHFLOW ('
            + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
            + ' type TEXT,'
            + ' date TEXT,'
            + ' amount NUMERIC,'
            + ' description TEXT);').then().catch(e => console.error(e));
    }

    //Metodo
    public async getClashFlows() {
        //La palabra clave super hace referencia a la clase heredada
        return super.findAll()
    }

    public async getClashFlowById(identifier: Partial<ICashFlow>) {
        try {
            const result = await super.findByID(identifier);
            return result;
        } catch (ex: unknown) {
            console.log("CashFlowDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async insertNewCashFlow(newCashFlow: ICashFlow) {
        try {
            //Damos la responsabilidad al driver de conectarse a la BDD y grabarlo
            const result = await super.createOne(newCashFlow);
            return result;
        } catch (ex: unknown) {
            console.log("CashFlow sqlite: ", (ex as Error).message);
            throw ex;
        }

    }

    public async updateNewCashFlow(updateCashFlow: ICashFlow) {
        try {
            //Damos la responsabilidad al driver de conectarse a la BDD y grabarlo
            const { _id, ...updateObject } = updateCashFlow;
            const result = await super.update({ _id }, updateObject);
            return result;
        } catch (ex: unknown) {
            console.log("CashFlowDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deleteCashFlow(deleteCashFlow: Partial<ICashFlow>) {
        try {
            //Damos la responsabilidad al driver de conectarse a la BDD y grabarlo
            const { _id } = deleteCashFlow;
            const result = await super.delete({ _id });
            return result;
        } catch (ex: unknown) {
            console.log("CashFlow sqlite:", (ex as Error).message);
            throw ex;
        }
    }
}