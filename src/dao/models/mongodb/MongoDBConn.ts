//Para establecer la conexión
import { MongoClient } from "mongodb";

//Realizar una conexion para poder conectarme
let connection:MongoClient = null;
//Por si no se conecta que se conecte a una local
let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017'; 
let mongoDBName = process.env.MONGO_DB_NAME || 'sw202203';

//Vamos a exportar elementos que nos devuelven una conexión
export const getConnection = async ()=> {
    //
    if (!connection) {
        connection = await MongoClient.connect(mongoURI);
    }
    return{
        connection, db: connection.db(mongoDBName)
    }
}