//Exportamos la interfaz, los entities son las tablas
export interface IUser {
    name: string;
    email: string;
    status: string; //'ACT' | 'INA' | 'BLQ';
    password?: string;
    oldPasswords?: string[]; //Para actualizar o recuperar la constraseña, se guardan las ultimas 10
    created: Date;
    updated: Date;
    avatar?: string;
    failedAttempts?: number;
    lastLogin?: Date;
    roles: string[];
    //Este 'id' depende de que base de datos estemos utilizando, no importando que BDD
    _id?: unknown; //Le ponemos ? porque no sabemos como viene
};