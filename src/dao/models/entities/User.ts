//Exportamos la interfaz, los entities son las tablas
export interface IUser {
    idNumber: string;
    name: string;
    lastName: string;
    age: number;
    cellPhone: number;
    direction: string;
    //Este 'id' depende de que base de datos estemos utilizando, no importando que BDD
    _id?: unknown; //Le ponemos ? porque no sabemos como viene
};