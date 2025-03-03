'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js'
import companiaRoutes from "../src/compania/compania.routes.js"
import {createAdimDefault} from "../src/admin/admin.controller.js"

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) => {
    app.use("/companySystem/v1/auth", authRoutes);
    app.use("/companySystem/v1/companias", companiaRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion a la Base de Datos Excelente");
    } catch (error) {
        console.log("Error al conectar con la Base de Datos", error);
    }
}

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    await conectarDB();
    await createAdimDefault();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}