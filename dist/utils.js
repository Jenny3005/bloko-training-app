"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrice = validatePrice;
exports.validateProductData = validateProductData;
exports.generateId = generateId;
// Valide si un prix est correct
function validatePrice(price) {
    return typeof price === "number" && price > 0;
}
// Valide les données d'un produit
function validateProductData(data) {
    if (!data.title || data.title.trim().length === 0) {
        return {
            message: "Le titre du produit est obligatoire",
            code: "INVALID_TITLE",
            statusCode: 400,
        };
    }
    if (!data.description || data.description.trim().length === 0) {
        return {
            message: "La description est obligatoire",
            code: "INVALID_DESCRIPTION",
            statusCode: 400,
        };
    }
    if (!validatePrice(data.price)) {
        return {
            message: "Le prix doit être un nombre strictement positif",
            code: "INVALID_PRICE",
            statusCode: 400,
        };
    }
    return null; // Tout est valide
}
// Génère un ID unique
function generateId() {
    return "${Date.now()}-${Math.floor(Math.random() * 1000000)}";
}
