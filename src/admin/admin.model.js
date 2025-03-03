import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nombre obligatorio"]
    },
    surname: {
        type: String,
        required: [true, "Apellido obligatorio"]
    },
    username: {
        type: String,
        required: [true, "Nombre del admin obligatorio"]
    },
    email:{
        type: String,
        required: [true, "Correo obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Contraseña obligatorio"]
    },
    phone: {
        type: String,
        minlength:8,
        maxlength:8,
        required: [true,"Numero de telefono obligatorio"]
    },
    status: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function() {
    const {__v,password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model("Admin", UserSchema);