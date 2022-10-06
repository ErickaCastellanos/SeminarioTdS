//Definimos una variable para la conexión
import sqlite from 'sqlite';

let connection = null;
//Este va a ser una conexión, este es un patron singleton(recomendada)
/** Lo que hace esta función es revisar si no existe una conexión
*la crea y si si existe entonces retorna esa conexión ya establecida*/
export const getConnection = async (url?: string ) => {
    if(!connection) {
        //Sino le manda nada entonces le damos la oportunidad de que envie este
        const dbUrl = (!url)? url: process.env.DB_URI || 'sample.db';
        //Que espere un momento antes de abrir la BDD y conectarse
        connection = await sqlite.open({
            filename: dbUrl,
            driver: sqlite.Database
        });
    }

    return connection;
}