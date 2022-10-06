import { IDaoObject } from "@server/dao/daoBase";

//Esta clase puede generar el tipo especifico segun el modelo que
//estamos trabajando
export abstract class AbstractDao<T> implements IDaoObject {
    public persistanceName: string;
    private connection: unknown;
    //Definimos que valores van a trabajar, no sabemos si viene o no conexion
    constructor(persistanceName: string, connection?: unknown) {
        this.persistanceName = persistanceName;

        if (connection) {
            this.connection = connection;
        }
    }
 
    //Me devuelve el tipo de dato que es la promesa de un arreglo de T(Genérico)
    public findAll(): Promise<T[]> {
        throw new Error("Not Implemented");
    };

    public findByID(){
        throw new Error("Not Implemented");
    };

    public update(){
        throw new Error("Not Implemented");
    };

    public delete(){
        throw new Error("Not Implemented");
    };

    public findByFilter(){
        throw new Error("Not Implemented");
    };

    public aggregate(){
        throw new Error("Not Implemented");
    };
}