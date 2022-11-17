import { LinkedinUser } from "../entities/auth"; //Obtener la interfaz
import { AbstractDao } from "./AbstractDao";
import { Db } from "mongodb"; //Saber que le mandamos un conexion mongodb

export class LinkedinUsersDao extends AbstractDao<LinkedinUser>{
    public constructor(db: Db) {
        super('usersLinkedin', db);
    }

    getUserByEmail(email: string) {
        const query = { email };
        return this.findOneByFilter(query);
    }

    getAllUsers() {
        return this.findAll();
    }

    addRoleToUser(id: string, role: string) {
        return this.updateRaw(id,
            // {$push : {roles: role}}
            { $addToSet: { roles: role } }
        );
    }

    changeUserPassword() { }

    //Nos aseguramos que no lleve niingun parcial
    createUser(user: LinkedinUser) {
        const { _id, ...newUser } = user;
        return this.createOne(newUser);
    }
}