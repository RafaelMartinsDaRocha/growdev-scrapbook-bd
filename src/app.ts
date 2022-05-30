import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Database from './database/connections/Database';
import ErrandsRoutes from './routers/errands-routes';
import { HttpError } from './error'

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
        const errandsRoutes = new ErrandsRoutes().initialize();
        this.#express.use(errandsRoutes);
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
    }
};