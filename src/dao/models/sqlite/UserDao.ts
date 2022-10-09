import { IUser } from "../entities/User";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

//Definimos el tipo de datos de la tabla
export class UserDao extends AbstractDao<IUser> {
    public constructor(db: sqlite.Database) {
        //Vamos a esperar que nos inyecte la bdd para acceder
        super('USER', db as sqlite.Database);
        super.exec('CREATE TABLE IF NOT EXISTS USER ('
            + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
            + 'idNumber TEXT,'
            + 'name TEXT,'
            + 'lastName TEXT,'
            + 'age NUMERIC,'
            + 'cellPhone NUMERIC,'
            + 'direction TEXT);').then().catch(e => console.error(e));

    }

    //Metodos
    public async getUsers() {
        return super.findAll()
    }

    public async getUserById(identifier: Partial<IUser>) {
        try {
            const result = await super.findByID(identifier);
            return result;
        } catch (ex: unknown) {
            console.log("UserDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async insertNewUser(newUser: IUser) {
        try {
            const result = await super.createOne(newUser);
            return result;
        } catch (ex: unknown) {
            console.log("User sqlite:", (ex as Error).message);
            throw ex;
        }   
    }

    public async updateNewUser(updateUser: IUser) {
        try {
            const { _id, ...updateObject } = updateUser;
            const result = await super.update({ _id }, updateObject);
            return result;
        } catch (ex: unknown) {
            console.log("User sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deteleUser(deleteUser: Partial<IUser>) {
        try {
            const { _id } = deleteUser;
            const result = await super.delete({ _id });
            return result;
        } catch (ex: unknown) {
            console.log("User sqlite:", (ex as Error).message);
            throw ex;
        }
    }
}