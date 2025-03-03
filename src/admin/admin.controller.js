import Usuario from "./admin.model.js";
import { hash } from "argon2";

export const createAdimDefault = async () => {
    try {
        const adminExistente = await Usuario.findOne({ email: "admin@gmail.com" });
        if (!adminExistente) {
            const passwordEncriptada = await hash("Admin1234");
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