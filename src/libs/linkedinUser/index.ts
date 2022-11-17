import { getConnection } from "@models/mongodb/MongoDBConn";
import { LinkedinUsersDao } from "@models/mongodb/UserLinkedinDao";
//import { checkPassword, getPassword } from "@utils/crypto";
//import { sign } from "@utils/jwt";

export class UsersLinkedin {
    private dao: LinkedinUsersDao;
    public constructor() {
        getConnection()
            .then(conn => {
                this.dao = new LinkedinUsersDao(conn);
            })
            .catch(ex => console.error(ex));
    }

    public signin(name: string, email: string, token: string, firstIdentification: boolean, tokenExpirationTime: number) {
        //const currentDate = new Date();
        const newUser = {
            name,
            email,
            token,
            tokenExpirationTime,
            firstIdentification,
            _id: null
        };
        return this.dao.createUser(newUser);
    }

    public async login(email: string) {
        try {
            const user = await this.dao.getUserByEmail(email);
            if (!!!user) {
                console.log("LOGIN: NO USER FOUND: ", `${email}`);
                throw new Error("LOGIN NO USER FOUND");
            }  
        } catch (err) {
            console.log("LOGIN:", err);
            throw err;
        }
    }
}