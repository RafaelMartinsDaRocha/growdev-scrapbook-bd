import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from './database/connection/Database';
import ErrandsRoutes from './routers/errands-routes';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();        
    }

    async init() {
        this.config();
        // this.middlewares();
        this.routers();
        // this.errors();
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

    private middlewares() {
    
    }

    private errors() {
    
    }

    private routers() {
        const errandsRoutes = new ErrandsRoutes().initialize();
        this.#express.use(errandsRoutes);
    }

    private async database() {
        await Database.getInstance();
    }
};