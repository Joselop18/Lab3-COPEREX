'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js'
import Usuario from "../src/admin/admin.model.js";
import { hash } from "argon2";

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
}

const crearAdmin = async () => {
    try {
        const adminExistente = await Usuario.findOne({ email: "admin@gmail.com" });

        if (!adminExistente) {

            const passwordEncriptada = await hash("Admin123");

            const admin = new Usuario({
                name: "Admin",
                surname: "Dueño",
                username: "El jefe",
                email: "admin@gmail.com",
                phone: "52646846",
                password: passwordEncriptada
            });

            await admin.save();
            console.log("Se creo el Admin correctamente por defecto");
        } else {
            console.log("El Admin ya existe");
        }
    } catch (error) {
        console.error("Hay un error al poder crear el Admin:", error);
    }
};

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
    await crearAdmin();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}