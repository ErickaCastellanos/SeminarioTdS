/* Este archivo es para cualquier objeto dao una interfaz que nos permita extraer
algo adicional, es la estructura base ya sea para sqlite o mongodb */
//Definición de interfaz
export interface IDaoObject {
    //Definición de la base estructural, capa que nos permite 
    //realizar todas las operaciones
    findAll: Function;
    findByID: Function;
    createOne: Function;
    update: Function;
    delete: Function;
    findByFilter: Function;
    aggregate: Function;
}

//Definición de la interfaz de cada función