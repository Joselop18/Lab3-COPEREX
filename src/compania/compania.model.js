import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nombre de la empresa obligatorio"]
    },
    impactLevel: {
        type: String,
        required: [true, "Nivel de impacto obligatorio"]
    },
    yearsOfExperience: {
        type: Number,
        required: [true, "Años de experiencia obligatorio"],
        min: [0, "No pude ser negativo los años de experiencia"]
    },
    category: {
        type: String,
        required: [true, "Categoria de empresa es obligatorio"]
    },
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    contactEmail: {
        type: String,
        required: [true, "Correo de empresa obligatorio"],
        unique: true
    },
    contactPhone: {
        type: String,
        required: [true, "No. Telefonico de la empresa es obligatorio"],
        minlength: 8,
        maxlength: 8
    },
    status: {
        type: Boolean,
        default: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

CompaniaSchema.methods.toJSON = function() {
    const {__v, _id, ...empresa} = this.toObject();
    empresa.id = _id;
    return empresa;
}

export default mongoose.model("Compañia", CompaniaSchema);
