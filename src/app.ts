import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Database from './database/connections/Database';
import Redis from './database/connections/Redis';
import { HttpError } from './error'
import path from 'path';
import fs from 'fs';
import { HttpRouter } from './contracts'

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();        
    }

    async init() {
        this.config();
        this.routers();
        this.errors();
        await this.database();
    }

    start(port: number) {
        this.#express.listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}...`)
        });
    }

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(cors());
    }

    private routers() {
        const routersPath = path.resolve(__dirname, 'routers');

        fs.readdirSync(routersPath).forEach(filename => {
            import(path.resolve(routersPath, filename)).then(file => {
                const instance = new file.default() as HttpRouter;

                this.#express.use(instance.init())
            });
        })
    }

    private errors() {
        this.#express.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
            return response.status(error.status).json({
                mensagem: error.message
            })
        })
    }

    private async database() {
        await Database.getInstance();
        Redis.getInstance();
    }
};