import {hash, verify} from "argon2";
import Usuario from '../admin/admin.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const {email, password, username} = req.body;

    try {
        const user = await Usuario.findOne({
            $or: [{email},{username}]
        })

        if(!user){
            return res.status(400).json({
                msg: "Verifique credenciales, este correo no esta en la base de datos"
            });
        }

        if(!user.status){
            return res.status(400).json({
                msg: "Este usuario no existe en la base de datos"
            }); 
        }

        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Contraseña Incorrecta, ingrese de nuevo"
            })
        }

        const token = await generarJWT(user.id);
        
        res.status(200).json({
            msg: "Se ha iniciado sesion",
            userDetails: {
                username: user.username,
                token: token
            }
        })

        
    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: 'Server Error',
            error: e.message
        })
    }
}