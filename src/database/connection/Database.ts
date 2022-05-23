import { Connection, createConnection } from 'typeorm';

export default class Database {
    private static instance: Connection;

    private constructor() {}

    private async openConnection() {
        try {
            return await createConnection();
        } catch (error) {
            throw new Error('Erro ao conectar no banco de dados');
        }
    }
    static async getInstance() {
        if (!Database.instance) {
            const database = new Database();
            Database.instance = await database.openConnection();
        }

        return Database.instance;
    }

}