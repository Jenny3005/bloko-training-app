import { ApiError, CreateProductRequest } from "./types";

// Valide si un prix est correct
export function validatePrice(price: number): boolean {
  return typeof price === "number" && price > 0;
}

// Valide les données d'un produit
export function validateProductData(
  data: CreateProductRequest
): ApiError | null {
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
export function generateId(): string {
  return "${Date.now()}-${Math.floor(Math.random() * 1000000)}";
}
