import { body } from 'express-validator';
import { validarCampos } from './validar-campos.js';
import { existenteEmail } from '../helpers/db-validator.js';
 
export const registerValidator = [
    body('name', 'Nombre requerido').not().isEmpty(),
    body('surname', "Apellido requerido").not().isEmpty(),
    body('email', "Ingrese un email valido").isEmail(),
    body("email").custom(existenteEmail),
    body("password", "Ingrese una contraseña de 6 caracteristicas como minimo").isLength({min: 6}),
    validarCampos
]
 
export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un email valido"),
    body ("username").optional().isString().withMessage("Ingrese un apodo"),
    body("password", "Ingrese una contraseña de 6 caracteristicas como minimo").isLength({min: 6}),
    validarCampos
]