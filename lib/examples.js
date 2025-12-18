"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUser = createMockUser;
exports.isExpensiveProduct = isExpensiveProduct;
exports.mockApiSuccess = mockApiSuccess;
exports.mockApiError = mockApiError;
// Fonction qui retourne un utilisateur fictif
function createMockUser(name, email) {
    return {
        id: Math.random().toString(36).substring(2, 9), // Génère un ID aléatoire
        name: name,
        email: email,
        createdAt: new Date(), // Date actuelle
    };
}
// Fonction qui vérifie si un produit est cher (> 100€)
function isExpensiveProduct(product) {
    return product.price > 100;
}
// Fonction qui simule une réponse API
function mockApiSuccess(data) {
    return {
        success: true,
        data: data,
    };
}
// Fonction bonus pour simuler une réponse API d'erreur
function mockApiError(errorMessage) {
    return {
        success: false,
        error: errorMessage,
    };
}
