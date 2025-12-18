// Types pour les requêtes API
export type CreateProductRequest = {
  title: string;
  description: string;
  price: number;
};
export type UpdateProductRequest = Partial<CreateProductRequest>;
export type ApiError = {
  message: string;
  code: string;
  statusCode: number;
};
