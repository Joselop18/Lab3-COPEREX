import Usuario from '../admin/admin.model.js';

export const existenteEmail = async (correo = '') => {

    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`Este correo ${correo} ya se encuentra en la base de datos`);
    }
}

export const existeUsuarioById = async (id = "") => {

    const existeUsuario = await Usuario.findById(id);

    console.log("Id")
    
    if(!existeUsuario){
        throw new Error(`El ID ${id} no se encuentra`);
    }
}