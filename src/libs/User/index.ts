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

    public getAllUsers() {
        return this.dao.getUsers()
    }

    public getUserByIndex(index: number) {
        return this.dao.getUserById({_id:index});
    }

    public addUser(user: IUser) {
        return this.dao.insertNewUser(user);
    }

    public updateUser(index: number, user: IUser) {
        return this.dao.update({_id:index}, user);
    }

    public deleteUser(index: number) {
        return this.dao.deteleUser({_id:index});
    }

}