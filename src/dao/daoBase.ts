/* Este archivo es para cualquier objeto dao una interfaz que nos permita extraer
algo adicional, es la estructura comple ya sea para sqlite o mongodb */
//Definición de interfaz
export  interface IDaoObject {
    //Definición de la base estructural, capa que nos permite 
    //realizar todas las operaciones
    persistanceName: string;
    findAll: Function; //No ocupa nada se queda como función
    findByID: Function; //obtenemos un id(_id, objectId)
    upadte: Function; 
    delete: Function; 
    finddByFilter: Function; 
    aggregate: Function; 
}

//Definición de la interfaza de cada función