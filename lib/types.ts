// Types pour notre application
export type User = {
id: string;
name: string;
email: string;
createdAt: Date;
};
export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  createdAt: Date;
};
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};