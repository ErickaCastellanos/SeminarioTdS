//Exportamos la interfaz, los entities son las tablas
export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: string;
    //Este 'id' depende de que base de datos estemos utilizando, no importando que BDD
    _id?: unknown; //Le ponemos ? porque no sabemos como viene
};