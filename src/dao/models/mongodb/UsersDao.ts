import { IUser } from "../entities/User"; //Obtener la interfaz
import { AbstractDao } from "./AbstractDao";
import { Db } from "mongodb"; //Saber que le mandamos un conexion mongodb

export class UsersDao extends AbstractDao<IUser>{
    public constructor(db: Db) {
        super('users', db);
    }
    getUserByEmail(email: string) {
        const query = { email };
        return this.findOneByFilter(query);
    }

    getAllUsers() {
        return this.findAll();
    }

    updateUserFailed(id: string) {
        //Lo que falle se contara
        return this.updateRaw(id, { $inc: { failedAttempts: 1 }, $set: { updated: new Date() } });
    }

    //Me actualice cuando fue la ultima vez que se logueo y cuantas veces falló
    updateLoginSuccess(id: string) {
        const currentDate = new Date();
        return this.update(id, { lastLogin: currentDate, failedAttempts: 0, updated: currentDate });
    }

    addRoleToUser(id: string, role: string) {
        return this.updateRaw(id,
            // {$push : {roles: role}}
            { $addToSet: { roles: role } }
        );
    }
    
    changeUserPassword() { }

    //Nos aseguramos que no lleve niingun parcial
    createUser(user: IUser) {
        const { _id, ...newUser } = user;
        return this.createOne(newUser);
    }
}
