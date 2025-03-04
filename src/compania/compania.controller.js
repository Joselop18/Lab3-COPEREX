import Compania from "../compania/compania.model.js";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

export const generarReporte = async (req, res) => {
    try {
        const companias = await Compania.find({});
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Empresas');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 36 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Nivel de impacto', key: 'impactLevel', width: 20 },
            { header: 'Años de experiencia', key: 'yearsOfExperience', width: 20 },
            { header: 'Categoría', key: 'category', width: 20 },
            { header: 'Descripción', key: 'description', width: 50 },
            { header: 'Email de empresa', key: 'contactEmail', width: 30 },
            { header: 'Teléfono de empresa', key: 'contactPhone', width: 20 },
            { header: 'Fecha de Registro', key: 'registrationDate', width: 30 },
            { header: 'Estado', key: 'status', width: 15 }
        ];

        companias.forEach(compania => {
            worksheet.addRow({
                id: compania.id,
                name: compania.name,
                impactLevel: compania.impactLevel,
                yearsOfExperience: compania.yearsOfExperience,
                category: compania.category,
                description: compania.description || 'N/A',
                contactEmail: compania.contactEmail,
                contactPhone: compania.contactPhone,
                registrationDate: compania.registrationDate.toISOString().slice(0, 10),
                status: compania.status ? 'Activa' : 'Inactiva'
            });
        });

        const localFilePath = "C:../../Desktop/Reporte-Empresa.xlsx";

        await workbook.xlsx.writeFile(localFilePath);
        console.log(`Archivo guardado en: ${localFilePath}`);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Reporte-Empresa.xlsx');
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al generar este reporte",
            error: error.message
        });
    }
};