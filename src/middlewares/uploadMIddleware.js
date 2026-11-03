// s3 - lambda - qeues (sqs - rabbit mq - kafka - bullmq + redis) - azure - google cloud plataform - aws

import fs from "fs";
import path from "path";
import multer from "multer";

function ensureFolder(dir){
    fs.mkdirSync(dir, {recursive: true});
}

//dni.pdf
function BuildStorage(folder) {
    ensureFolder(folder);
    return multer.diskStorage({
        destination : (req, file, cb) => cb(null, folder),
        filename : (req, file, cb) => {
            const extension = path.extname(file.originalname);
            const filename = `${Date.now()}${Math.round(Math.random() * 1e9)}${extension}`;// 22-11-2026-21360179647120412.pdf
            cb(null, filename);
        }
    });
}

/**
 * declaramos funcion reutilizable de filtros
 * y limites de tamaño de archivo
 * 
 */




export const uploadDocument = multer({
    storage: BuildStorage("uploads/document"),
    /**
     * filtros por tipo de archivo
     * filtro por limite de archivo
     * filtros especificos por tipo de documento
     */
})

export const uploadRecipt = multer({
    storage: BuildStorage("uploads/recipt"),
    /**
     * filtros por tipo de archivo
     * filtro por limite de archivo
     * filtros especificos por tipo de recibo
     */
})

export const uploadProof = multer({
    storage: BuildStorage("uploads/proof"),
    /**
     * filtros por tipo de archivo
     * filtro por limite de archivo
     * filtros especificos por tipo de comprobante
     */
})