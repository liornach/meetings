import { env } from "process";

class AppConfig {

    // Server Port:
    public port = process.env.PORT;

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "Lior";

    // Database Password: 
    public mySqlPassword = "Nachmias";

    // Database Name: 
    public mySqlDatabase = "appointments" // Fill in database name;
}

const appConfig = new AppConfig();

export default appConfig;
