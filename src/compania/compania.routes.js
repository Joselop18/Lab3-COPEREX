import { Router } from "express";
import { check } from "express-validator";
import { createCompania, getCompanias, updateCompania } from "./compania.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("name", "Nombre de la empresa obligatorio").not().isEmpty(),
        check("impactLevel", "Nivel de impacto obligatorio").not().isEmpty(),
        check("yearsOfExperience", "Años de experiencia es obligatorio").isNumeric(),
        check("category", "Categoria de empresa es obligatorio").not().isEmpty(),
        check("contactEmail", "Email de empresa es obligatio").isEmail(),
        check("contactPhone", "No. Telefonico de empresa es obligatorio").isLength({ min: 8, max: 8 }),
        validarCampos
    ],
    createCompania
);

router.get(
    "/",
    [
        validarJWT,
    ],
    getCompanias
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "ID invalido").isMongoId(),
        check("name", "Nombre de la empresa obligatorio").not().isEmpty(),
        check("impactLevel", "Nivel de impacto obligatorio").not().isEmpty(),
        check("yearsOfExperience", "Años de experiencia es obligatorio").isNumeric(),
        check("category", "Categoria de empresa es obligatorio").not().isEmpty(),
        check("contactEmail", "Email de empresa es obligatio").isEmail(),
        check("contactPhone", "No. Telefonico de empresa es obligatorio").isLength({ min: 8, max: 8 }),
        validarCampos

    ],
    updateCompania
);

export default router;