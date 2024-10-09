const mysql = require('mysql2/promise');

class DatabaseDriver {
    constructor() {
        this._connect();
    }

    async _connect() {
        if (!this.connection) {
            try {
                this.connection = await mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PWD,
                    port: process.env.DB_PORT,
                    database: process.env.DB_NAME
                });
                console.log('Database connected');
            } catch (err) {
                console.error('Failed to connect to the database', err);
                throw new Error('Failed to connect to the database');
            }
        }
    }

    static getInstance() {
        if (!DatabaseDriver.instance) {
            DatabaseDriver.instance = new DatabaseDriver();
        }
        return DatabaseDriver.instance;
    }
}

module.exports = DatabaseDriver;