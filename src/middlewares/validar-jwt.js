import jwt from "jsonwebtoken";
import Usuario from "../admin/admin.model.js";

export const validarJWT = async(req, res, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "En esta peticion no hay Token"
        })
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msg:"Este usuario no existe en la base de datos"
            })
        }

        if(!usuario.status){
            return res.status(401).json({
                msg: "Token invalido"
            })
        }

        req.usuario = usuario;
        next();

    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token invalido"
        })
    }
}