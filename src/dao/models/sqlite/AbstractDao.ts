import { IDaoObject } from "@server/dao/daoBase";
import sqlite from 'sqlite';

//Esta clase puede generar el tipo especifico segun el modelo que
//estamos trabajando
export abstract class AbstractDao<T> implements IDaoObject {
    public persistanceName: string;
    private connection: sqlite.Database;
    //Definimos que valores van a trabajar, no sabemos si viene o no conexion
    constructor(persistanceName: string, connection?: sqlite.Database) {
        this.persistanceName = persistanceName;

        if (connection) {
            this.connection = connection;
        }
    }
 
    //Me devuelve el tipo de dato que es la promesa de un arreglo de T(Genérico)
    public async findAll(): Promise<T[]> {
        const sqlStr = `SELECT * from ${this.persistanceName};`;
        const datos = await this.connection.all(sqlStr);

        return datos;
    };

    public async findByID(identifier: Partial<T>): Promise<T>{
        //Obtenemos los datos
        const {columns, values, params:_params} = this.getColValParmArr(identifier);
        const sqlSelect = `SELECT * from ${this.persistanceName} where ${columns.map(o=>`${o}=?`).join(' and ')};`;
        const dato = await this.connection.get(sqlSelect, values);

        return dato;
    }; 


    //Va a recibir la data, defino la T porque yo puedo definir como 
    //voy a guardar en mi base de datos ese valor
    public async createOne(data: T): Promise<T>{
        //Creamos la sentencia sql en el momento y vamos agregar los valores a traves de parámetros
        //const sqlStr = "INSERT INTO (...columns) values (...valores)";
    
        const {columns, values, params} = this.getColValParmArr(data);

        //Contruir la sentencia sql y establecemos las columnas y los obejtos que van a necesitar
        const sqlInsert = `INSERT INTO ${this.persistanceName} ( ${columns.join(', ')}) VALUES (${params.join(', ')})`;

        await this.connection.exec(sqlInsert, values);
        return data;
    };

    //El identificador para el id del elemento y la data que son los datos a actualizar
    public async update(identifier: Partial<T>, data: Partial<T>): Promise<boolean> {
        //Update table_name set ...columns=?, where ...identifier=?;
        const {columns, values, params:_params} = this.getColValParmArr(data);
        const {columns:columnsId, values:valuesId, params:_paramsId} = this.getColValParmArr(identifier);
        const finalValues = [...values, ...valuesId];
        const sqlUpdate = `UPDATE ${this.persistanceName} SET ${columns.map((o)=>`${o}=?`).join(' ')} WHERE ${columnsId.map((o)=>`${o}=?`).join(' ')};`;
        
        await this.connection.exec(sqlUpdate, finalValues);
        return true;
    };

    public async delete(identifier: Partial<T>): Promise<boolean>{
        const {columns, values, params:_params} = this.getColValParmArr(identifier);
        const sqlDelete = `DELETE from ${this.persistanceName} where ${columns.map(o=>`${o}=?`).join(' and ')};`;

        await this.connection.exec(sqlDelete, values);
        return true;
    };

    public findByFilter(){
        throw new Error("Not Implemented");
    };

    public aggregate(){
        throw new Error("Not Implemented");
    };

    public exec(sqlstr: string) {
        return this.connection.exec(sqlstr);
    }

    //Utiitario
    private getColValParmArr(data: Partial<T>): {columns:string[], values:unknown[], params:string[]} {
        //Extraemos las llaves de data
        const columns = Object.keys(data);
        const values = Object.values(data);
        const params = columns.map(()=>'?');

        return {columns, values, params}
    }  
}