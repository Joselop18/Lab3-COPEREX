import Company from "../compania/compania.model.js";
import ExcelJS from "exceljs";

export const createCompania = async (req, res) => {
    try {
        const { name, impactLevel, yearsOfExperience, category, description, contactEmail, contactPhone } = req.body;
        const existingcompania = await Compania.findOne({ contactEmail });
        if (existingcompania) {
            return res.status(400).json({
                success: false,
                message: "Empresa registrada con este correo, utilice otro"
            });
        }

        const compania = new Compania({
            name,
            impactLevel,
            yearsOfExperience,
            category,
            description,
            contactEmail,
            contactPhone
        });

        await compania.save();

        res.status(201).json({
            success: true,
            message: "Se registro la empresa correctamente",
            compania
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No se pudo registrar la empresa",
            error: error.message
        });
    }
};

export const getCompanias = async (req, res) => {
    try {
        const { filtro, sort } = req.query;
        const filtroQuery = {};
        if (filtro) {
            const filtroCriterio = JSON.parse(filtro);
            if (filtroCriterio.category) filtroQuery.category = filtroCriterio.category;
            if (filtroCriterio.yearsOfExperience) filtroQuery.yearsOfExperience = { $gte: filtroCriterio.yearsOfExperience };
            if (filtroCriterio.impactLevel) filtroQuery.impactLevel = filtroCriterio.impactLevel;
        }

        const sortQuery = sort ? JSON.parse(sort) : { name: 1 }; 
        const companias = await Compania.find(filtroQuery).sort(sortQuery);

        res.status(200).json({
            success: true,
            companias
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No se pudo obtener las empresas, hubo un error",
            error: error.message
        });
    }
};

export const updateCompania = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, impactLevel, yearsOfExperience, category, description, contactEmail, contactPhone } = req.body;
        const compania = await Compania.findById(id);
        if (!compania){
            return res.status(404).json({
                success: false,
                message: "No se pudeo encontrar la empresa"
            });
        }

        const updatedCompania = await Compania.findByIdAndUpdate(id, {
            name,
            impactLevel,
            yearsOfExperience,
            category,
            description,
            contactEmail,
            contactPhone
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Se actualizo la empresa correctamente",
            updatedCompania
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No se pudo actualizar la empresa, hubo error",
            error: error.message
        });
    }
};