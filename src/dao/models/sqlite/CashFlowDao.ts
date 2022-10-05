//Definimos una variable para la conexión
import sqlite from 'sqlite';

let connection = null;
//Este va a ser una conexión, este es un patron single tone(recomendada)
/** Lo que hace esta función es revisar si no existe una conexión
* Sino existe entonces está null y si está null realiza el proceso de conexión*/
export const getConnection = async (url?: string ) => {
    if(!connection) {
        //Sino le manda nada entonces le damos la oportunidad de qu envie este
        const dbUrl = (!url)? url: process.env.DB_URI || 'sample.db';
        connection = await sqlite.open({
            filename: dbUrl,
            driver: sqlite.Database
        });
    }

    return connection;
}