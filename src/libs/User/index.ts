import { getConnection } from "@server/dao/models/sqlite/SqliteConn";
import { UserDao } from "@server/dao/models/sqlite/UserDao";
export interface IUser {
    idNumber: string;
    name: string;
    lastName: string;
    age: number;
    cellPhone: number;
    direction: string;
};

//Definición de la clase
export class User {
    private dao: UserDao;
    public constructor() {
        getConnection()
        .then(conn => {
            this.dao = new UserDao(conn);
        })
        .catch(ex => console.error(ex));
    }
    
    /****************************************** CONSULTAS ******************************************/
    //Obtener todos los elementos
    public getAllUsers() {
        //Contiene todos los elementos privados del CashFlow
        return this.dao.getUsers() //return this.cashFlowItems; // select * from cashflow;
    }

    //Obtener por id los elementos, pero debemos manejar los extremos validando
    //que si el index es mayor a cero devolvemos el usuario
    public getUserByIndex(index: number) {
        return this.dao.getUserById({_id:index});
    }

    //Inserta en el arreglo clasflowitems va agregar el nuevo cashflow que
    //se le está mandando si ya no esxite internamente dentro de ese arreglo
    public addUser(user: IUser) {
        //Método pra encontrar el îndice de un objeto basåndose en ciertas características
        return this.dao.insertNewUser(user);
    }

    //Actualizar, recibiendo un index y recibimos un usuario como tal, este CF devolverá un booleano
    public updateUser(index: number, user: IUser) {
        return this.dao.update({_id:index}, user);
    }

    //Eliminar el usuario, ocupamos un número y devolvemos verdadero o falso
    public deleteUser(index: number) {
        return this.dao.deteleUser({_id:index});
    }

}