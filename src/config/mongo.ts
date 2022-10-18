//Importamos
import { getConnection } from "@models/mongodb/MongoDBConn";

//Mandamos a llamar a ese elemento
export const initMongo = (next) => {
  getConnection().then(
    (_db) => {
      console.log("MONGO SUCCESS");
      next();
    }
  ).catch((error) => {
    console.log("MONGO ERROR:", error);
    process.exit(1);
  });
}