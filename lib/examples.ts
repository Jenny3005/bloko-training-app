import { User, Product, ApiResponse } from "./types";

// Fonction qui retourne un utilisateur fictif
export function createMockUser(name: string, email: string): User {
  return {
    id: Math.random().toString(36).substring(2, 9), // Génère un ID aléatoire
    name: name,
    email: email,
    createdAt: new Date(), // Date actuelle
  };
}

// Fonction qui vérifie si un produit est cher (> 100€)
export function isExpensiveProduct(product: Product): boolean {
  return product.price > 100;
}

// Fonction qui simule une réponse API
export function mockApiSuccess<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data: data,
  };
}

// Fonction bonus pour simuler une réponse API d'erreur
export function mockApiError<T>(errorMessage: string): ApiResponse<T> {
  return {
    success: false,
    error: errorMessage,
  };
}
